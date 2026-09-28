import { deleteHistorialById, getHistorialesLectura, getHistorialLecturaById, insertHistorial, updateHistorial } from "../models/historialesLecturasModel.js";

export async function nuevoHistorial(obj, idUsuario) {
    try {
        const rows = await insertHistorial(obj, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function actualizarHistorial(obj, idHistorial, idUsuario) {
    try {
        const rows = await updateHistorial(obj, idHistorial, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
export async function obtenerHistoriales(idUsuario, fechaInicio, fechaFin) {
    try {
        const rows = await getHistorialesLectura(idUsuario, fechaInicio, fechaFin);

        const historiales = [];

        for (const row of rows) {
            let historial = historiales.find(x => x.id === row.id);

            if (!historial) {
                historial = {
                    id: row.id,
                    fechaInicio: row.fechaInicio,
                    fechaFin: row.fechaFin,
                    idRegistro: row.idRegistro,
                    primeraPagina: row.primeraPagina,
                    ultimaPagina: row.ultimaPagina,
                    paginaActual: row.paginaActual,
                    registro: {
                        titulo: row.titulo,
                        subtitulo: row.subtitulo,
                        anioPublicacionOriginal: row.fechaPublicacionOriginal
                            ? new Date(row.fechaPublicacionOriginal).getFullYear()
                            : null,
                        autorias: []
                    }
                };

                historiales.push(historial);
            }

            if (row.nombre || row.apellido) {
                historial.registro.autorias.push({
                    nombre: row.nombre,
                    apellido: row.apellido
                });
            }
        }

        return historiales;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function obtenerHistorial(idHistorial, idUsuario) {
    try {
        const rows = await getHistorialLecturaById(idHistorial, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function borrarHistorial(idHistorial, idUsuario) {
    try {
        const rows = await deleteHistorialById(idHistorial, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}