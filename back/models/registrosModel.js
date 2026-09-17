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

export async function getRegistros(idUsuario) {
    try {
        const query = `SELECT
            r.id,
            r.idTipoRegistro,
            r.titulo,
            r.subtitulo,
            r.fechaPublicacionOriginal,
            r.fechaEdicion,
            r.editorialRevista,
            tr.nombre AS tipoRegistro,
            a.id AS idAutoria,
            a.apellido AS autoria,
            t.id AS idTema,
            t.nombre AS tema
            from registros r
            left join registros_autorias ra ON ra.idRegistro = r.id
            left join registros_temas rt ON rt.idRegistro = r.id
            left join tipos_registros tr ON tr.id = r.idTipoRegistro
            left join autorias a ON a.id = ra.idAutoria
            left join temas t ON t.id = rt.idTema
            WHERE r.idUsuario IS NULL
            OR r.idUsuario = ?`;

        const [rows] = await pool.query(query, [idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
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