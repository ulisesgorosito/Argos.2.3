import pool from './bd.js';

export async function getTemas(idUsuario, searchTerm = "", pagina = 1, limite = 20) {
    try {
        const query = `
            SELECT *
            FROM temas
            WHERE idUsuario = ?
              AND nombre LIKE ?
            ORDER BY nombre
            LIMIT ? OFFSET ?
        `;

        const offset = (pagina - 1) * limite;
        const [rows] = await pool.query(query, [
            idUsuario,
            `%${searchTerm}%`,
            limite,
            offset
        ]);

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function countTemas(idUsuario, searchTerm = "") {
    try {
        const query = `
            SELECT COUNT(*) AS total
            FROM temas
            WHERE idUsuario = ?
              AND nombre LIKE ?
        `;

        const [rows] = await pool.query(query, [
            idUsuario,
            `%${searchTerm ?? ""}%`
        ]);

        return rows[0].total;
    } catch (error) {
        console.log(error);
        throw error;
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

export async function getTemasDropdown(idUsuario) {
    try {
        const query = `SELECT id, nombre FROM temas WHERE idUsuario = ?
        order by nombre`;
        const [rows] = await pool.query(query, [idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}