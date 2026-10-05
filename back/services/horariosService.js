import { insertHorario, updateHorario, deleteHorarioById} from "../models/horariosModel.js";

export async function nuevoHorario(obj, idUsuario) {
    try {
        obj.id = crypto.randomUUID();
        const rows = await insertHorario(obj);
        return obj.id;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function actualizarHorario(obj, idHorario, idUsuario) {
    try {
        const rows = await updateHorario(obj, idHorario, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}


export async function borrarHorario(idHorario, idUsuario) {
    try {
        const rows = await deleteHorarioById(idHorario, idUsuario);
        console.log("Horario eliminado:", rows);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}