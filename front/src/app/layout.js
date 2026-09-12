import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

import Nav from "@/components/Nav";
import DarkModeToggle from "@/components/DarkModeToggle";
import LogoutButton from "@/components/LogoutButton";
import { cookies } from "next/headers";

export default async function RootLayout({ children }) {
    const cookieStore = await cookies();
    let user = null;

    try {
        const response = await fetch(
            `${process.env.API_BASE_URL}/auth/me`,
            {
                headers: {
                    Cookie: cookieStore.toString()
                },
                cache: "no-store"
            }
        );

        if (response.ok) {
            user = await response.json();
            console.log(user);
        }
        else {
            console.error("Error verificando sesión:", response.status, response.statusText, response);
        }
    } catch (error) {
        console.error("Error verificando sesión:", error);
    }

    return (
        <html lang="es">
            <body>
                <header className="main-header">
                    <div className="container d-flex justify-content-between align-items-center">
                        <h1>
                            <i className="bi bi-book"></i>
                            Cuervo Biblioteca
                        </h1>

                        <div>
                            {user ? (
                                <>
                                    <span className="me-3">
                                        <i className="bi bi-person-circle"></i>{" "}
                                        {user.userName}
                                    </span>

                                    <LogoutButton />
                                </>
                            ) : (
                                <a
                                    href="/admin/login"
                                    className="btn-login"
                                >
                                    <i className="bi bi-box-arrow-in-right"></i>{" "}
                                    Iniciar sesión
                                </a>
                            )}

                            <DarkModeToggle />
                        </div>
                    </div>
                </header>

                {user && <Nav />}

                <main className="container">
                    {children}
                </main>

                <footer>
                    ESTO ES UN FOOTER
                </footer>
            </body>
        </html>
    );
}