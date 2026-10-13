import pool from './bd.js';

export async function insertSeleccion(obj) {
    try {
        var query = "INSERT INTO selecciones_lectura SET ?";
        var [rows] = await pool.query(query, [obj]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateSeleccion(obj, idSeleccion, idHistorial) {
    try {
        var query = "UPDATE selecciones_lectura SET ? WHERE id = ? AND idHistorialLectura = ?";
        var [rows] = await pool.query(query, [obj, idSeleccion, idHistorial]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteSeleccion(idHistorial) {
    try {
        var query = "DELETE FROM selecciones_lectura WHERE idHistorialLectura = ?";
        var [rows] = await pool.query(query, [idHistorial]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}