import Link from "next/link";

export default function Nav() {
    return (
        <nav className="navbar navbar-expand-lg main-navbar">
            <div className="container">

                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <Link className="nav-link" href="/">
                            <i className="bi bi-house"></i>
                            Inicio
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" href="/registros">
                            <i className="bi bi-journal-text"></i>
                            Registros
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" href="/temas">
                            <i className="bi bi-tags"></i>
                            Temas
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" href="/listas">
                            <i className="bi bi-bookmarks"></i>
                            Listas de lectura
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
    );
}
