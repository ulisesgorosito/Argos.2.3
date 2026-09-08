import Link from "next/link";

export default function Nav() {
    return (
        <nav>
            <ul className="holder">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/temas">Temas</Link></li>
            </ul>
        </nav>
    )
}