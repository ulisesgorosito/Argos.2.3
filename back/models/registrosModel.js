import pool from './bd.js';

export async function getRegistros() {
    try {
        const query = "SELECT * FROM registros ";
        const [rows] = await pool.query(query);
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