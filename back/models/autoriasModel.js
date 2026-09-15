import pool from './bd.js';

export async function getAutorias(idUsuario) {
    try {
        const query = "SELECT * FROM autorias WHERE idUsuario = ?";
        const [rows] = await pool.query(query, [idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getAutoriaById(idAutoria, idUsuario) {
    try {
        const query = "SELECT * FROM autorias WHERE id = ? AND idUsuario = ?";
        const [rows] = await pool.query(query, [idAutoria, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function insertAutoria(obj, idUsuario) {
    try {
        obj.idUsuario = idUsuario;
        console.log("obj en insertAutoria:", obj);
        var query = "insert into autorias set ?"
        var [rows] = await pool.query(query, [obj])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateAutoria(obj, idAutoria, idUsuario) {
    try {
        var query = "UPDATE autorias SET ? WHERE id = ? AND idUsuario = ?";
        console.log(idUsuario);
        console.log(obj);
        var [rows] = await pool.query(query, [obj, idAutoria, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteAutoriaById(idAutoria) {
    var query = "delete from autorias where id = ? "
    try {
        var [rows] = await pool.query(query, [idAutoria])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

