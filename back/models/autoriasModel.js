import pool from './bd.js';

export async function getAutorias() {
    try {
        const query = "SELECT * FROM autorias ";
        const [rows] = await pool.query(query);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function getAutoriaById(idAutoria) {
    try {
        const query = "SELECT * FROM autorias WHERE id = ?";
        const [rows] = await pool.query(query, [idAutoria]);
        return rows;
    } catch (error) {
        console.log(error);
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

export async function updateAutoria(obj, idAutoria) {
    try {
        var query = "UPDATE autorias SET ? WHERE id = ?";
        var [rows] = await pool.query(query, [obj, idAutoria]);
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

