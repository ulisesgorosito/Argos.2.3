"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function apiFetch(path, options = {}) {
    try {
        const cookieStore = await cookies();
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
        console.log(response);

        if (!response.ok) {
            console.log(response);
            throw new Error(`Error HTTP ${response.status}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error en apiFetch:", error);
        throw error;
    }
}

export async function obtener(path) {
    return apiFetch(path);
}

export async function guardarRequest(path, datos, method) {
    console.log("guardarRequest:", path, datos, method);
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