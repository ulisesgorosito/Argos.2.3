import pool from './bd.js';

export async function getListas(idUsuario) {
    try {
        const query = `
            SELECT
                l.id,
                l.nombre,
                l.descripcion,
                COUNT(rl.id) AS cantidadRegistros
            FROM listas l
            LEFT JOIN registros_listas rl ON rl.idLista = l.id
            WHERE l.idUsuario = ?
            GROUP BY l.id
            ORDER BY l.nombre
        `;

        const [rows] = await pool.query(query, [idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getLista(idLista, idUsuario) {
    try {
        const query = `
            SELECT
                l.id,
                l.nombre,
                l.descripcion,
                r.id AS idRegistro,
                r.titulo,
                rl.orderInt
            FROM listas l
            LEFT JOIN registros_listas rl ON rl.idLista = l.id
            LEFT JOIN registros r ON r.id = rl.idRegistro
            WHERE l.id = ?
            AND l.idUsuario = ?
            ORDER BY rl.orderInt
        `;

        const [rows] = await pool.query(query, [idLista, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteLista(idLista, idUsuario) {
    try {
        const query = `
            DELETE FROM listas
            WHERE id = ?
            AND idUsuario = ?
        `;

        const [rows] = await pool.query(query, [idLista, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function insertLista(obj, idUsuario) {
    try {
        obj.idUsuario = idUsuario;
        var query = "insert into listas set ?"
        var [rows] = await pool.query(query, [obj])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateLista(obj, idLista, idUsuario) {
    try {
        console.log("actualizar lista", obj, idLista, idUsuario)
        var query = "UPDATE listas SET ? WHERE id = ? AND idUsuario = ?";
        var [rows] = await pool.query(query, [obj, idLista, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function sincronizarRegistrosLista(idLista, registros, idUsuario) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [lista] = await connection.query(
            `
                SELECT id
                FROM listas
                WHERE id = ?
                AND idUsuario = ?
            `,
            [idLista, idUsuario]
        );

        if (lista.length === 0) {
            throw new Error("Lista no encontrada");
        }

        const idsRegistro = registros.map((registro) => registro.idRegistro);

        if (idsRegistro.length > 0) {
            await connection.query(
                `
                    DELETE FROM registros_listas
                    WHERE idLista = ?
                    AND idRegistro NOT IN (?)
                `,
                [idLista, idsRegistro]
            );
        } else {
            await connection.query(
                `
                    DELETE FROM registros_listas
                    WHERE idLista = ?
                `,
                [idLista]
            );
        }

        for (const registro of registros) {
            await connection.query(
                `
                    INSERT INTO registros_listas
                    (idRegistro, idLista, orderInt, fechaAgregado)
                    VALUES (?, ?, ?, NOW())
                    ON DUPLICATE KEY UPDATE
                        orderInt = VALUES(orderInt)
                `,
                [
                    registro.idRegistro,
                    idLista,
                    registro.orderInt
                ]
            );
        }

        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
}