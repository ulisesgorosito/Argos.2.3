import pool from './bd.js';

export async function getRegistroById(idRegistro, idUsuario) {
    try {
        const query = `SELECT * FROM registros WHERE id = ? AND idUsuario = ?`;

        const [rows] = await pool.query(query, [idRegistro, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getRegistros(idUsuario) {
    try {
        const query = `SELECT
            registros.id,
            registros.idTipoRegistro,
            registros.titulo,
            registros.subtitulo,
            registros.fechaPublicacionOriginal,
            registros.fechaEdicion,
            registros.editorialRevista
            from registros
            WHERE registros.idUsuario IS NULL
            OR registros.idUsuario = ?`;

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
        var query = "UPDATE temas SET ? WHERE id = ? AND idUsuario = ? ";
        var [rows] = await pool.query(query, [obj, idRegistro, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteRegistroById(idRegistro, idUsuario) {
    var query = "delete from temas where id = ? AND idUsuario = ? "
    try {
        var [rows] = await pool.query(query, [idRegistro, idUsuario])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}