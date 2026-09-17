export const extraerAnio = (valor) => {
    if (!valor) return "";

    const match = String(valor).match(/\d{4}/);
    return match ? match[0] : "";
};