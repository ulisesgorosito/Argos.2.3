"use client";

import { useEffect, useRef, useState } from "react";
import { obtener } from "@/services/apiService";
import SearchableSelect from "../SearchableSelect";

export default function RegistroFiltro({ filtros, onChange }) {
    const [temas, setTemas] = useState([]);
    const [tiposRegistros, setTiposRegistros] = useState([]);
    const [listas, setListas] = useState([]);
    const [dropdownAbierto, setDropdownAbierto] = useState(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        async function cargarTodo() {
            try {
                const [temas, tiposRegistros, listas] = await Promise.all([
                    obtener("/temas"),
                    obtener("/tiposRegistro"),
                    obtener("/listas")
                ]);

                setTemas(temas);
                setTiposRegistros(tiposRegistros);
                setListas(listas);
            } catch (error) {
                console.error(error);
            }
        }

        cargarTodo();
    }, []);

    useEffect(() => {
        const handler = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownAbierto(null);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const cambiarFiltro = (nombre, ids) => {
        onChange({
            ...filtros,
            [nombre]: ids
        });
    };

    const limpiarFiltros = () => {
        onChange({
            idsTemas: [],
            idsTiposRegistros: [],
            idsListas: []
        });
    };

    const renderFiltro = (titulo, nombre, opciones) => (
        <div className="position-relative">
            <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() =>
                    setDropdownAbierto(
                        dropdownAbierto === nombre ? null : nombre
                    )
                }
            >
                {titulo} ({filtros[nombre].length})
                <span className="ms-2">▾</span>
            </button>

            {dropdownAbierto === nombre && (
                <div
                    className="position-absolute bg-body text-body border rounded shadow p-2"
                    style={{
                        top: "100%",
                        left: 0,
                        zIndex: 1050,
                        minWidth: "260px",
                        width: "max-content",
                        maxWidth: "320px"
                    }}
                >
                    <SearchableSelect
                        opciones={opciones}
                        value={filtros[nombre]}
                        onChange={ids => cambiarFiltro(nombre, ids)}
                        placeholder={`Buscar ${titulo.toLowerCase()}...`}
                        multiple
                    />
                </div>
            )}
        </div>
    );

    return (
        <div
            className="d-flex flex-wrap gap-2 mb-3 align-items-center"
            ref={dropdownRef}
        >
            {renderFiltro("Temas", "idsTemas", temas)}
            {renderFiltro("Tipos de registro", "idsTiposRegistros", tiposRegistros)}
            {renderFiltro("Listas", "idsListas", listas)}

            <button
                type="button"
                className="btn btn-secondary"
                onClick={limpiarFiltros}
            >
                Limpiar filtros
            </button>
        </div>
    );
}