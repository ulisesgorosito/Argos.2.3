"use client";
import { useEffect, useState } from "react";

export default function DarkModeToggle() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const currentTheme = localStorage.getItem("theme");

        if (currentTheme === "dark") {
            document.body.classList.add("dark-mode");
            setDarkMode(true);
        }
    }, []);

    const toggleDarkMode = () => {
        const isDark = document.body.classList.toggle("dark-mode");

        localStorage.setItem("theme", isDark ? "dark" : "light");
        setDarkMode(isDark);
    };

    return (
        <button
            id="darkModeToggle"
            className="dark-mode-toggle"
            title="Cambiar modo"
            onClick={toggleDarkMode}
        >
            <i className={`bi ${darkMode ? "bi-sun-fill" : "bi-moon-fill"}`}></i>
            <span>{darkMode ? "Modo claro" : "Modo oscuro"}</span>
        </button>
    );
}