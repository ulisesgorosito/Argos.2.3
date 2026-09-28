import pool from './bd.js';

export async function getHistorialesLectura(idUsuario, fechaInicio, fechaFin) {

    try {

        const query = `
            SELECT
                hl.id,
                hl.fechaInicio,
                hl.fechaFin,
                hl.idRegistro,
                hl.primeraPagina,
                hl.ultimaPagina,
                hl.paginaActual,
                r.titulo,
                r.subtitulo,
                r.fechaPublicacionOriginal,
                a.nombre,
                a.apellido
            FROM cuervo_biblioteca.historiales_lectura hl
            INNER JOIN cuervo_biblioteca.registros r
                ON r.id = hl.idRegistro
            LEFT JOIN cuervo_biblioteca.registros_autorias ra
                ON ra.idRegistro = r.id
            LEFT JOIN cuervo_biblioteca.autorias a
                ON a.id = ra.idAutoria
            WHERE hl.idUsuario = ?
        `;

        const [rows] = await pool.query(query, [idUsuario]);
        return rows;

    } catch (error) {
        console.log(error);
    }

}

export async function getHistorialLecturaById(idHistorial, idUsuario) {
    try {
        const query = "SELECT * FROM historiales_lectura WHERE id = ? AND idUsuario = ? ";
        const [rows] = await pool.query(query, [idHistorial, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
    }
}
export async function insertHistorial(obj, idUsuario) {
    try {
        obj.idUsuario = idUsuario;
        var query = "insert into historiales_lectura set ?"
        var [rows] = await pool.query(query, [obj])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

export async function updateHistorial(obj, idHistorial, idUsuario) {
    try {
        var query = "UPDATE historiales_lectura SET ? WHERE id = ? AND idUsuario = ? ";
        var [rows] = await pool.query(query, [obj, idHistorial, idUsuario]);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function deleteHistorialById(idHistorial, idUsuario) {
    var query = "delete from historiales_lectura where id = ?  AND idUsuario = ?"
    try {
        var [rows] = await pool.query(query, [idHistorial, idUsuario])
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

