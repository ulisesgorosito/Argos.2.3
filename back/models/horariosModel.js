import pool from './bd.js';

export async function insertHorario(obj) {
    try {
        var query = "insert into horarios_actividades set ?"
        var [rows] = await pool.query(query, [obj])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateHorario(obj, idHorario, idUsuario) {
    try {
        var query = `
    UPDATE horarios_actividades ha
    INNER JOIN actividades a ON a.id = ha.idActividad
    SET ?
    WHERE ha.id = ?
      AND a.idUsuario = ?
`;
        var [rows] = await pool.query(query, [obj, idHorario, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteHorarioById(idHorario, idUsuario) {
    var query = `
        DELETE ha
        FROM horarios_actividades ha
        INNER JOIN actividades a ON a.id = ha.idActividad
        WHERE ha.id = ? AND a.idUsuario = ?
    `;

    try {
        var [rows] = await pool.query(query, [idHorario, idUsuario]);

        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

