"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function SearchableSelect({
    opciones = [],
    value,
    onChange,
    placeholder = "Buscar...",
    cargando = false,
    getOptionLabel = (opcion) => opcion.nombre,
    getOptionValue = (opcion) => opcion.id,
    renderOption,
    multiple = false
}) {
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownAbierto, setDropdownAbierto] = useState(false);
    const dropdownRef = useRef(null);

    const opcionesFiltradas = useMemo(() => {
        const texto = searchTerm.trim().toLowerCase();

        return opciones.filter(opcion =>
            getOptionLabel(opcion)?.toLowerCase().includes(texto)
        );
    }, [searchTerm, opciones, getOptionLabel]);

    useEffect(() => {
        const handler = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownAbierto(false);
            }
        };

        document.addEventListener("mousedown", handler);

        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const handleSeleccionar = (opcion) => {
        const id = getOptionValue(opcion);

        if (multiple) {
            const valoresSeleccionados = value ?? [];

            onChange(
                valoresSeleccionados.includes(id)
                    ? valoresSeleccionados.filter(valor => valor !== id)
                    : [...valoresSeleccionados, id],
                opcion
            );
            return;
        }

        onChange(id, opcion);
        setSearchTerm("");
        setDropdownAbierto(false);
    };

    return (
        <div className="position-relative" ref={dropdownRef}>
            <input
                type="text"
                className="form-control"
                placeholder={placeholder}
                value={searchTerm}
                onChange={event => {
                    setSearchTerm(event.target.value);
                    setDropdownAbierto(true);
                }}
                onFocus={() => setDropdownAbierto(true)}
            />

            {(dropdownAbierto) && (
                <div
                    className="list-group position-absolute w-100 bg-body text-body shadow"
                    style={{
                        zIndex: 1050,
                        maxHeight: "300px",
                        overflowY: "auto"
                    }}
                >
                    {cargando ? (
                        <div className="list-group-item bg-body text-body-secondary">
                            Cargando...
                        </div>
                    ) : opcionesFiltradas.length === 0 ? (
                        <div className="list-group-item bg-body text-body-secondary">
                            Sin resultados
                        </div>
                    ) : (
                        opcionesFiltradas.map(opcion => {
                            const id = getOptionValue(opcion);
                            const seleccionado = multiple
                                ? (value ?? []).includes(id)
                                : value === id;

                            return (
                                <button
                                    key={id}
                                    type="button"
                                    className={`list-group-item list-group-item-action bg-body text-body ${seleccionado ? "active" : ""
                                        }`}
                                    onClick={() => handleSeleccionar(opcion)}
                                >
                                    {multiple && (
                                        <input
                                            type="checkbox"
                                            className="form-check-input me-2"
                                            checked={seleccionado}
                                            readOnly
                                        />
                                    )}
                                    {renderOption
                                        ? renderOption(opcion)
                                        : getOptionLabel(opcion)}
                                </button>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
}