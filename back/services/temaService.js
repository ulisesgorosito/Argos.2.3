import { countTemas, getTemas, getTemasDropdown } from "../models/temasModels.js";

export async function obtenerTemasDropdown(idUsuario) {
    const autorias = await getTemasDropdown(idUsuario);
    return autorias;
}

export async function obtenerTemas(
    idUsuario,
    searchTerm = "",
    pagina = 1,
) {
    const limite = 20;

    const temas = await getTemas(
        idUsuario,
        `%${searchTerm ?? ""}%`,
        pagina,
        limite,
    );

    const total = await countTemas(
        idUsuario,
        `%${searchTerm ?? ""}%`
    );

    return {
        totalPaginas: Math.ceil(total / limite),
        temas
    };
}