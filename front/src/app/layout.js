import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./globals.css";

import Nav from "@/components/Nav";
import DarkModeToggle from "@/components/DarkModeToggle";

export const metadata = {
    title: "Cuervo Biblioteca",
    description: "Aplicación para gestionar una biblioteca personal",
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body>

                <header className="main-header">
                    <div className="container d-flex justify-content-between align-items-center">
                        <h1>
                            <i className="bi bi-book"></i>
                            Cuervo Biblioteca
                        </h1>

                        <DarkModeToggle />
                    </div>
                </header>

                <Nav />

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