import pool from './bd.js';

export async function getHistorialesLectura(
    idUsuario,
    filtros,
    pagina = 1,
    limite = 10
) {
    try {
        const condiciones = ["hl.idUsuario = ?"];
        const parametros = [idUsuario];

        if (filtros.fechaDesde) {
            condiciones.push("hl.fechaInicio >= ?");
            parametros.push(filtros.fechaDesde);
        }

        if (filtros.fechaHasta) {
            condiciones.push("hl.fechaInicio <= ?");
            parametros.push(filtros.fechaHasta);
        }

        if (filtros.searchTerm) {
            condiciones.push(`(
                r.titulo LIKE ?
                OR EXISTS (
                    SELECT 1
                    FROM cuervo_biblioteca.registros_autorias ra2
                    INNER JOIN cuervo_biblioteca.autorias a2
                        ON a2.id = ra2.idAutoria
                    WHERE ra2.idRegistro = r.id
                    AND CONCAT(a2.nombre, ' ', a2.apellido) LIKE ?
                )
            )`);

            parametros.push(
                `%${filtros.searchTerm}%`,
                `%${filtros.searchTerm}%`
            );
        }

        if (filtros.leidos !== null) {
            condiciones.push("hl.leido = ?");
            parametros.push(filtros.leidos);
        }

        if (filtros.abandonados !== null) {
            condiciones.push("hl.abandonado = ?");
            parametros.push(filtros.abandonados);
        }
        const where = condiciones.join(" AND ");

        const query = `
            SELECT
                hl.id,
                hl.fechaInicio,
                hl.fechaFin,
                hl.idRegistro,
                hl.paginaActual,
                hl.leido,
                hl.abandonado,
                r.titulo,
                r.subtitulo,
                r.paginas,
                r.fechaPublicacionOriginal,
                a.nombre,
                a.apellido,
                sl.id AS idSeleccion,
                sl.titulo AS tituloSeleccion,
                sl.primeraPagina,
                sl.ultimaPagina
            FROM cuervo_biblioteca.historiales_lectura hl
            INNER JOIN cuervo_biblioteca.registros r
                ON r.id = hl.idRegistro
            LEFT JOIN cuervo_biblioteca.registros_autorias ra
                ON ra.idRegistro = r.id
            LEFT JOIN cuervo_biblioteca.autorias a
                ON a.id = ra.idAutoria
            LEFT JOIN cuervo_biblioteca.selecciones_lectura sl
                ON sl.idHistorialLectura = hl.id
            WHERE ${where}
            ORDER BY hl.fechaInicio DESC
            LIMIT ? OFFSET ?
        `;

        const offset = (pagina - 1) * limite;

        const [rows] = await pool.query(query, [
            ...parametros,
            limite,
            offset
        ]);

        const [countRows] = await pool.query(`
            SELECT COUNT(DISTINCT hl.id) AS total
            FROM cuervo_biblioteca.historiales_lectura hl
            INNER JOIN cuervo_biblioteca.registros r
                ON r.id = hl.idRegistro
            WHERE ${where}
        `, parametros);

        return {
            rows,
            total: countRows[0].total,
            pagina,
            limite
        };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getHistorialLecturaById(idHistorial, idUsuario) {
    try {
        const query = `
            SELECT
                historiales_lectura.id,
                historiales_lectura.fechaInicio,
                historiales_lectura.fechaFin,
                historiales_lectura.idRegistro,
                historiales_lectura.paginaActual,
                historiales_lectura.leido,
                historiales_lectura.abandonado,
                selecciones_lectura.id AS idSeleccion,
                selecciones_lectura.idHistorialLectura,
                selecciones_lectura.titulo,
                selecciones_lectura.primeraPagina,
                selecciones_lectura.ultimaPagina
            FROM historiales_lectura
            LEFT JOIN selecciones_lectura
                ON selecciones_lectura.idHistorialLectura = historiales_lectura.id
            WHERE historiales_lectura.id = ?
                AND historiales_lectura.idUsuario = ?
        `;

        const [rows] = await pool.query(query, [idHistorial, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function insertHistorial(obj, idUsuario) {
    try {
        obj.idUsuario = idUsuario;
        var query = "insert into historiales_lectura set ?"
        var [rows] = await pool.query(query, [obj])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateHistorial(obj, idHistorial, idUsuario) {
    try {
        var query = "UPDATE historiales_lectura SET ? WHERE id = ? AND idUsuario = ? ";
        var [rows] = await pool.query(query, [obj, idHistorial, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteHistorialById(idHistorial, idUsuario) {
    var query = "delete from historiales_lectura where id = ?  AND idUsuario = ?"
    try {
        var [rows] = await pool.query(query, [idHistorial, idUsuario])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

