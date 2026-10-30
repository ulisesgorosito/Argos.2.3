import { getAutorias,countAutorias, getAutoriasDropdown }
 from "../models/autoriasModel.js";

export async function obtenerAutorias(idUsuario, searchTerm = "", pagina = 1) {
    const limite = 20;
    const autorias = await getAutorias(idUsuario, searchTerm, pagina, limite);
    const total = await countAutorias(idUsuario, searchTerm);
    return { autorias, totalPaginas: Math.ceil(total / limite) };
}

export async function obtenerAutoriasDropdown(idUsuario) {
    const autorias = await getAutoriasDropdown(idUsuario);
    return autorias;
}
