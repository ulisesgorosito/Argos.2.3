import pool from './bd.js';

export async function getActividades(idUsuario) {

    try {

        const query = `
        SELECT
            a.id,
            a.nombre,
            a.descripcion,
            a.idLista,
            ha.id AS idHorario,
            ha.intSemana,
            ha.horaDesde,
            ha.horaHasta,
            li.id AS idLista,
            li.nombre AS nombreLista
        FROM actividades a
        LEFT JOIN horarios_actividades ha
            ON ha.idActividad = a.id
        LEFT JOIN listas li
            ON li.id = a.idLista
        WHERE a.idUsuario = ?
    `;

        const [rows] = await pool.query(query, [idUsuario]);
        return rows;

    } catch (error) {
        console.log(error);
    }

}

export async function getActividadesDashboard(idUsuario, diaActual, horaActual) {
    try {
        const query = `
            SELECT
                a.id,
                a.nombre,
                a.descripcion,
                a.idLista,
                ha.id AS idHorario,
                ha.intSemana,
                ha.horaDesde,
                ha.horaHasta,
                li.nombre AS nombreLista
            FROM actividades a
            INNER JOIN horarios_actividades ha
                ON ha.idActividad = a.id
            LEFT JOIN listas li
                ON li.id = a.idLista
            WHERE a.idUsuario = ?
                AND (
                    ha.intSemana <> ?
                    OR ha.horaHasta > ?
                )
            ORDER BY
                (ha.intSemana - ? + 7) % 7,
                ha.horaDesde
            LIMIT 3
        `;

        const [rows] = await pool.query(query, [
            idUsuario,
            diaActual,
            horaActual,
            diaActual
        ]);

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getActividadById(idActividad, idUsuario) {
    try {
        const query = `SELECT 
            a.id,
            a.nombre,
            a.descripcion,
            a.idLista,
            ha.id AS idHorario,
            ha.intSemana,
            ha.horaDesde,
            ha.horaHasta
        FROM actividades a 
        LEFT JOIN horarios_actividades ha
            ON ha.idActividad = a.id
        WHERE a.id = ? AND a.idUsuario = ? `;
        const [rows] = await pool.query(query, [idActividad, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}

export async function insertActividad(obj, idUsuario) {
    try {
        obj.idUsuario = idUsuario;
        var query = "insert into actividades set ?"
        var [rows] = await pool.query(query, [obj])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateActividad(obj, idActividad, idUsuario) {
    try {
        var query = "UPDATE actividades SET ? WHERE id = ? AND idUsuario = ? ";
        var [rows] = await pool.query(query, [obj, idActividad, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteActividadById(idActividad, idUsuario) {
    var query = "delete from actividades where id = ?  AND idUsuario = ?"
    try {
        var [rows] = await pool.query(query, [idActividad, idUsuario])

        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

