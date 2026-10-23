import pool from './bd.js';

export async function getRegistroById(idRegistro, idUsuario) {
    try {
        const query = `
            SELECT
                r.*,
                a.id AS idAutoria,
                t.id AS idTema,
                l.id AS idLista
            FROM registros r
            LEFT JOIN registros_autorias ra ON ra.idRegistro = r.id
            LEFT JOIN autorias a ON a.id = ra.idAutoria
            LEFT JOIN registros_temas rt ON rt.idRegistro = r.id
            LEFT JOIN temas t ON t.id = rt.idTema
            LEFT JOIN registros_listas rl ON rl.idRegistro = r.id
            LEFT JOIN listas l ON l.id = rl.idLista
            WHERE r.id = ? AND r.idUsuario = ?
        `;

        const [rows] = await pool.query(query, [idRegistro, idUsuario]);

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getRegistrosSimple(idUsuario) {
    try {
        const query = `SELECT
            r.id,
            r.titulo,
            r.subtitulo,
            a.id AS idAutoria,
            a.apellido AS autoria
            from registros r
            left join registros_autorias ra ON ra.idRegistro = r.id
            left join autorias a ON a.id = ra.idAutoria
            WHERE r.idUsuario IS NULL
            OR r.idUsuario = ?`;

        const [rows] = await pool.query(query, [idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getRegistros(
    idUsuario,
    searchTerm = "",
    pagina = 1,
    limite,
    idsTemas = [],
    idsTiposRegistros = [],
    idsListas = []
) {
    try {
        const offset = (pagina - 1) * limite;

        const condiciones = [];
        const parametrosFiltros = [];

        if (idsTemas.length > 0) {
            condiciones.push(`EXISTS (
                SELECT 1
                FROM registros_temas rtFiltro
                WHERE rtFiltro.idRegistro = r.id
                AND rtFiltro.idTema IN (${idsTemas.map(() => "?").join(", ")})
            )`);
            parametrosFiltros.push(...idsTemas);
        }

        if (idsTiposRegistros.length > 0) {
            condiciones.push(`r.idTipoRegistro IN (${idsTiposRegistros.map(() => "?").join(", ")})`);
            parametrosFiltros.push(...idsTiposRegistros);
        }

        if (idsListas.length > 0) {
            condiciones.push(`EXISTS (
                SELECT 1
                FROM registros_listas rl
                JOIN listas l ON l.id = rl.idLista
                WHERE rl.idRegistro = r.id
                AND l.id IN (${idsListas.map(() => "?").join(", ")})
            )`);
            parametrosFiltros.push(...idsListas);
        }

        const query = `
            SELECT
                r.id,
                r.idTipoRegistro,
                r.titulo,
                r.subtitulo,
                r.paginas,
                r.fechaPublicacionOriginal,
                r.fechaEdicion,
                r.editorialRevista,
                tr.nombre AS tipoRegistro,
                a.id AS idAutoria,
                a.apellido AS autoria,
                t.id AS idTema,
                t.nombre AS tema
            FROM (
                SELECT
                    r.id,
                    MIN(a.apellido) AS apellidoOrden
                FROM registros r
                LEFT JOIN tipos_registros tr ON tr.id = r.idTipoRegistro
                LEFT JOIN registros_autorias ra ON ra.idRegistro = r.id
                LEFT JOIN autorias a ON a.id = ra.idAutoria
                LEFT JOIN registros_temas rt ON rt.idRegistro = r.id
                LEFT JOIN temas t ON t.id = rt.idTema
                WHERE (r.idUsuario IS NULL OR r.idUsuario = ?)
                AND (
                    r.titulo LIKE ?
                    OR r.subtitulo LIKE ?
                    OR tr.nombre LIKE ?
                    OR a.apellido LIKE ?
                    OR t.nombre LIKE ?
                )
                ${condiciones.length > 0 ? `AND ${condiciones.join(" AND ")}` : ""}
                GROUP BY r.id
                ORDER BY
                    apellidoOrden,
                    (SELECT r2.fechaPublicacionOriginal
                     FROM registros r2
                     WHERE r2.id = r.id) IS NULL,
                    (SELECT r2.fechaPublicacionOriginal
                     FROM registros r2
                     WHERE r2.id = r.id),
                    r.titulo
                LIMIT ? OFFSET ?
            ) registrosPaginados
            JOIN registros r ON r.id = registrosPaginados.id
            LEFT JOIN tipos_registros tr ON tr.id = r.idTipoRegistro
            LEFT JOIN registros_autorias ra ON ra.idRegistro = r.id
            LEFT JOIN autorias a ON a.id = ra.idAutoria
            LEFT JOIN registros_temas rt ON rt.idRegistro = r.id
            LEFT JOIN temas t ON t.id = rt.idTema
            ORDER BY
                registrosPaginados.apellidoOrden,
                r.fechaPublicacionOriginal IS NULL,
                r.fechaPublicacionOriginal,
                r.titulo`;

        const parametros = [
            idUsuario,
            `%${searchTerm}%`,
            `%${searchTerm}%`,
            `%${searchTerm}%`,
            `%${searchTerm}%`,
            `%${searchTerm}%`,
            ...parametrosFiltros,
            limite,
            offset
        ];

        const [rows] = await pool.query(query, parametros);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function countRegistros(
    idUsuario,
    searchTerm = "",
    idsTemas = [],
    idsTiposRegistros = [],
    idsListas = []
) {
    try {
        const condiciones = [];
        const parametrosFiltros = [];

        if (idsTemas.length > 0) {
            condiciones.push(`EXISTS (
                SELECT 1
                FROM registros_temas rtFiltro
                WHERE rtFiltro.idRegistro = r.id
                AND rtFiltro.idTema IN (${idsTemas.map(() => "?").join(", ")})
            )`);
            parametrosFiltros.push(...idsTemas);
        }

        if (idsTiposRegistros.length > 0) {
            condiciones.push(`r.idTipoRegistro IN (${idsTiposRegistros.map(() => "?").join(", ")})`);
            parametrosFiltros.push(...idsTiposRegistros);
        }

        if (idsListas.length > 0) {
            condiciones.push(`EXISTS (
                SELECT 1
                FROM registros_listas rl
                JOIN listas l ON l.id = rl.idLista
                WHERE rl.idRegistro = r.id
                AND l.id IN (${idsListas.map(() => "?").join(", ")})
            )`);
            parametrosFiltros.push(...idsListas);
        }

        const query = `
            SELECT COUNT(DISTINCT r.id) AS total
            FROM registros r
            LEFT JOIN registros_autorias ra ON ra.idRegistro = r.id
            LEFT JOIN registros_temas rt ON rt.idRegistro = r.id
            LEFT JOIN tipos_registros tr ON tr.id = r.idTipoRegistro
            LEFT JOIN autorias a ON a.id = ra.idAutoria
            LEFT JOIN temas t ON t.id = rt.idTema
            WHERE (r.idUsuario IS NULL OR r.idUsuario = ?)
            AND (
                r.titulo LIKE ?
                OR r.subtitulo LIKE ?
                OR tr.nombre LIKE ?
                OR a.apellido LIKE ?
                OR t.nombre LIKE ?
            )
            ${condiciones.length > 0 ? `AND ${condiciones.join(" AND ")}` : ""}`;

        const [rows] = await pool.query(query, [
            idUsuario,
            `%${searchTerm}%`,
            `%${searchTerm}%`,
            `%${searchTerm}%`,
            `%${searchTerm}%`,
            `%${searchTerm}%`,
            ...parametrosFiltros
        ]);

        return rows[0].total;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function insertRegistro(obj, idUsuario) {
    try {
        obj.idUsuario = idUsuario;
        var query = "insert into registros set ?"
        var [rows] = await pool.query(query, [obj])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

// registroAutoriaService.js
export async function insertRegistroAutoria(idRegistro, idAutoria) {
    try {
        const obj = {
            idRegistro,
            idAutoria
        };

        const query = "insert into registros_autorias set ?";
        const [rows] = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// registroTemaService.js
export async function insertRegistroTema(idRegistro, idTema) {
    try {
        const obj = {
            idRegistro,
            idTema
        };

        const query = "insert into registros_temas set ?";
        const [rows] = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// registroListaService.js
export async function insertRegistroLista(idRegistro, idLista) {
    try {
        const obj = {
            idRegistro,
            idLista
        };

        const query = "insert into registros_listas set ?";
        const [rows] = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateRegistro(obj, idRegistro, idUsuario) {
    try {
        var query = "UPDATE registros SET ? WHERE id = ? AND idUsuario = ? ";
        var [rows] = await pool.query(query, [obj, idRegistro, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteRegistroById(idRegistro, idUsuario) {
    var query = "delete from registros where id = ? AND idUsuario = ? "
    try {
        var [rows] = await pool.query(query, [idRegistro, idUsuario])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteRegistroAutorias(idRegistro) {
    const query = "delete from registros_autorias where idRegistro = ?";
    await pool.query(query, [idRegistro]);
}

export async function deleteRegistroTemas(idRegistro) {
    const query = "delete from registros_temas where idRegistro = ?";
    await pool.query(query, [idRegistro]);
}

export async function deleteRegistroListas(idRegistro) {
    const query = "delete from registros_listas where idRegistro = ?";
    await pool.query(query, [idRegistro]);
}