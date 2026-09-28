export const extraerAnio = (valor) => {
    if (!valor) return "";

    const match = String(valor).match(/\d{4}/);
    return match ? match[0] : "";
};

export const extraerFecha = (valor) => {
    if (!valor) return "";

    const fecha = new Date(valor);

    if (isNaN(fecha.getTime())) return "";

    return fecha.toLocaleDateString("es-AR");
};