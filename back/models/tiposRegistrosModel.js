import pool from './bd.js';

export async function getTiposRegistros(idUsuario) {
    try {
        const query = "SELECT * FROM tipos_registros WHERE idUsuario IS NULL OR idUsuario = ?";
        const [rows] = await pool.query(query, [idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function insertTipoRegistro(obj, idUsuario) {
    try {
        obj.idUsuario = idUsuario;
        var query = "insert into tipos_registros set ?"
        var [rows] = await pool.query(query, [obj])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateTipoRegistro(obj, idTipoRegistro, idUsuario) {
    try {
        const query = "UPDATE tipos_registros SET ? WHERE id = ? AND idUsuario = ?";
        const [rows] = await pool.query(query, [obj, idTipoRegistro, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteTipoRegistroById(idTipoRegistro) {
    var query = "delete from autorias where id = ? "
    try {
        var [rows] = await pool.query(query, [idTipoRegistro])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}