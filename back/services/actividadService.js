import { deleteActividadById, getActividadById, getActividades, insertActividad, updateActividad } from "../models/actividadesModel";

export async function obtenerActividades(idUsuario) {
    try {
        const rows = await getActividades(idUsuario);

        const actividades = [];

        for (const row of rows) {
            let actividad = actividades.find(x => x.id === row.id);

            if (!actividad) {
                actividad = {
                    id: row.id,
                    nombre: row.nombre,
                    descripcion: row.descripcion,
                    idLista: row.idLista,
                    lista: {
                        id: row.idLista,
                        nombre: row.nombreLista,
                    },
                    horarios: []
                };

                actividades.push(actividad);
            }

                historial.horarios.push({
                    id: row.idHorario,
                    intSemana: row.intSemana,
                    horaDesde: row.horaDesde,
                    horaHasta: row.horaHasta
                });
        }

        return historiales;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function nuevaActividad(obj, idUsuario) {
    try {
        const rows = await insertActividad(obj, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function actualizarActividad(obj, idActividad, idUsuario) {
    try {
        const rows = await updateActividad(obj, idActividad, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function obtenerActividadById(idActividad, idUsuario) {
    try {
        const rows = await getActividadById(idActividad, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function borrarActividad(idActividad, idUsuario) {
    try {
        const rows = await deleteActividadById(idActividad, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}