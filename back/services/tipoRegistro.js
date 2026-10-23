import { getTiposRegistrosDropdown } from "../models/tiposRegistrosModel.js";

export async function obtenerTiposRegistroDropdown(idUsuario) {
    const response = await getTiposRegistrosDropdown(idUsuario);
    return response;
}