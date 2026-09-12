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

        return response.json();
    } catch (error) {
        console.error("Error en apiFetch:", error);
        throw error;
    }
}