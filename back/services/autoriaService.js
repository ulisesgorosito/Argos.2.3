import { getAutorias, getAutoriasDropdown }
 from "../models/autoriasModel.js";

export async function obtenerAutorias(idUsuario, searchTerm = "", pagina = 1) {
    const autorias = await getAutorias(idUsuario);
    //const total = await countAutorias(idUsuario, searchTerm);
    const total = autorias.length;
    return { autorias, total };
}

export async function obtenerAutoriasDropdown(idUsuario) {
    const autorias = await getAutoriasDropdown(idUsuario);
    return autorias;
}
