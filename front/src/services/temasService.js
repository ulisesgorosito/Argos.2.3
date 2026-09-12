// temaService.js
"use server";
import { apiFetch } from "@/app/helpers/apiHelper";

export async function obtenerTemas() {
    return apiFetch("/temas");
}

export async function crearTema(datos) {
    return apiFetch("/temas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });
}

export async function editarTema(id, datos) {
    return apiFetch(`/temas/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });
}

export async function eliminarTema(id) {
    return apiFetch(`/temas/${id}`, {
        method: "DELETE"
    });
}