import pool from './bd.js';

export async function getTiposRegistros() {
    try {
        const query = "SELECT * FROM tipos_registros ";
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
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