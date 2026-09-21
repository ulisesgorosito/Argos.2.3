import { deleteLista, getListas,getRegistrosDeLista, insertLista, sincronizarRegistrosLista, updateLista } from "../models/listasModel.js";

export async function nuevaLista(obj, idUsuario) {
    try {
        const rows = await insertLista(obj, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function actualizarLista(obj, idLista, idUsuario) {
    try {
        const rows = await updateLista(obj, idLista, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function obtenerListas(idUsuario) {
    try {
        const rows = await getListas(idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function obtenerRegistrosDeLista(idLista, idUsuario) {
    try {
        const rows = await getRegistrosDeLista(idLista, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function borrarLista(idLista, idUsuario) {
    try {
        const rows = await deleteLista(idLista, idUsuario);
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function actualizarRegistrosLista(idLista, idsRegistros, idUsuario) {
    try {
        const rows = await sincronizarRegistrosLista(
            idLista,
            idsRegistros,
            idUsuario
        );
        console.log("response", rows)
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}