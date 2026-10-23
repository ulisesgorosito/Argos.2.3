import { getTemasDropdown } from "../models/temasModels.js";

export async function obtenerTemasDropdown(idUsuario) {
    const autorias = await getTemasDropdown(idUsuario);
    return autorias;
}