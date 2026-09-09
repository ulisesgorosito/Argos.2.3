import { redirect } from "next/navigation";

export async function apiFetch(path, options = {}) {

    const response = await fetch(
        `${process.env.API_BASE_URL}${path}`,
        {
            ...options,
            redirect: "manual"
        }
    );

    if (response.status === 301 || response.status === 302) {
        redirect("/admin/login");
    }

    return response.json();
}
