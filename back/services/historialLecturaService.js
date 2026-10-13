import { deleteHistorialById, getHistorialesLectura, getHistorialLecturaById, insertHistorial, updateHistorial } from "../models/historialesLecturasModel.js";
import { deleteSeleccion, insertSeleccion } from "../models/seleccionesModel.js";

export async function nuevoHistorial(obj, idUsuario) {
    try {
        const { selecciones, ...historial } = obj;
        historial.id = crypto.randomUUID();

        const rows = await insertHistorial(historial, idUsuario);

        for (const seleccion of selecciones) {
            seleccion.idHistorialLectura = historial.id;
            await insertSeleccion(seleccion);
        }

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function actualizarHistorial(obj, idHistorial, idUsuario) {
    try {
        console.log(`Historial:  ${JSON.stringify(obj)}`)
        console.log(`idHistorial:  ${idHistorial}`)
        const { selecciones, id, ...historial } = obj;
        const rows = await updateHistorial(historial, idHistorial, idUsuario);

        await deleteSeleccion(idHistorial);

        for (const seleccion of selecciones) {
            seleccion.id = crypto.randomUUID();
            seleccion.idHistorialLectura = idHistorial;
            await insertSeleccion(seleccion);
        }

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

        if (rows.length === 0) {
            return null;
        }

        return {
            id: rows[0].id,
            fechaInicio: rows[0].fechaInicio,
            fechaFin: rows[0].fechaFin,
            idRegistro: rows[0].idRegistro,
            paginaActual: rows[0].paginaActual,
            idUsuario: rows[0].idUsuario,
            selecciones: rows
                .filter(row => row.idSeleccion !== null)
                .map(row => ({
                    id: row.idSeleccion,
                    titulo: row.titulo,
                    primeraPagina: row.primeraPagina,
                    ultimaPagina: row.ultimaPagina
                }))
        };
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