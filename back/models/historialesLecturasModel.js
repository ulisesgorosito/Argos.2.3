import pool from './bd.js';

export async function getHistorialesLectura(idUsuario, fechaInicio, fechaFin) {

    try {

        const query = `
            SELECT
                hl.id,
                hl.fechaInicio,
                hl.fechaFin,
                hl.idRegistro,
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
        const query = `
            SELECT
                historiales_lectura.id,
                historiales_lectura.fechaInicio,
                historiales_lectura.fechaFin,
                historiales_lectura.idRegistro,
                historiales_lectura.paginaActual,
                selecciones_lectura.id AS idSeleccion,
                selecciones_lectura.idHistorialLectura,
                selecciones_lectura.titulo,
                selecciones_lectura.primeraPagina,
                selecciones_lectura.ultimaPagina
            FROM historiales_lectura
            LEFT JOIN selecciones_lectura
                ON selecciones_lectura.idHistorialLectura = historiales_lectura.id
            WHERE historiales_lectura.id = ?
                AND historiales_lectura.idUsuario = ?
        `;

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

