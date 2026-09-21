"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function apiFetch(path, options = {}) {
    try {
        const cookieStore = await cookies();
        console.log(`ruta: ${process.env.API_BASE_URL}${path}`);
        const response = await fetch(
            `${process.env.API_BASE_URL}${path}`,
            {
                ...options,
                headers: {
                    ...options.headers,
                    Cookie: cookieStore.toString()
                },
                redirect: "manual"
            }
        );
        if (response.status === 301 || response.status === 302) {
            redirect("/admin/login");
        }

        if (!response.ok) {
            console.log("error de api:", response);
            const error = await response.text();
            console.log(error);
            throw new Error(`Error HTTP ${response.status}`);
        }
        const data = await response.json();

        console.log(path, data);

        return data;
    } catch (error) {
        console.error("Error en apiFetch:", error);
        throw error;
    }
}

export async function obtener(path) {
    return apiFetch(path);
}

export async function guardarRequest(path, datos, method) {
    console.log("guardar request:", path, datos, method);
    return apiFetch(path, {
        method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
    });
}

export async function eliminar(path) {
    return apiFetch(path, {
        method: "DELETE"
    });
}