import pool from './bd.js';

export async function getTemas(idUsuario) {
    try {
        const query = "SELECT * FROM temas WHERE idUsuario = ?";
        const [rows] = await pool.query(query, [idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getTemaById(idTema, idUsuario) {
    try {
        const query = "SELECT * FROM temas WHERE id = ? AND idUsuario = ? ";
        const [rows] = await pool.query(query, [idTema, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}
export async function insertTema(obj, idUsuario) {
    try {
        obj.idUsuario = idUsuario;
        var query = "insert into temas set ?"
        var [rows] = await pool.query(query, [obj])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateTema(obj, idTema) {
    try {
        var query = "UPDATE temas SET ? WHERE id = ?";
        var [rows] = await pool.query(query, [obj, idTema]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteTemaById(idTema) {
    var query = "delete from temas where id = ? "
    try {
        var [rows] = await pool.query(query, [idTema])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

