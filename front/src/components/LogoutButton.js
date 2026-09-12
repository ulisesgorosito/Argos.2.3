"use client";

export default function LogoutButton() {
    const handleLogout = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/logout`, {
            method: "POST",
            credentials: "include"
        });

        window.location.href = "/";
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="logout-button"
        >
            <i className="bi bi-box-arrow-right"></i>{" "}
            Cerrar sesión
        </button>
    );
}
