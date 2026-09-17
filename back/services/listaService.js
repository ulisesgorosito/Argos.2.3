import { deleteLista, getLista, getListas, insertLista, sincronizarRegistrosLista, updateLista } from "../models/listasModel.js";

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

export async function obtenerLista(idLista, idUsuario) {
    try {
        const rows = await getLista(idLista, idUsuario);
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

export async function actualizarRegistrosLista(idLista, registros, idUsuario) {
    try {
        const rows = await sincronizarRegistrosLista(
            idLista,
            registros,
            idUsuario
        );
        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}