"use client";

import { useEffect, useRef, useState } from "react";

export default function HistorialLecturaFiltro({ filtros, onChange }) {
    const [dropdownAbierto, setDropdownAbierto] = useState(false);
    const dropdownRef = useRef(null);

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

    const cambiarFiltro = (nombre, valor) => {
        onChange({
            ...filtros,
            [nombre]: valor
        });
    };

    const limpiarFiltros = () => {
        const hoy = new Date();
        const haceDosMeses = new Date();
        haceDosMeses.setMonth(haceDosMeses.getMonth() - 2);

        onChange({
            leidos: null,
            abandonados: null,
            fechaDesde: haceDosMeses.toLocaleDateString("en-CA"),
            fechaHasta: hoy.toLocaleDateString("en-CA"),
            searchTerm: ""
        });
    };

    return (
        <div className="d-flex flex-wrap gap-2 mb-3 align-items-center">
            <input
                type="text"
                className="form-control"
                style={{ maxWidth: "280px" }}
                placeholder="Buscar por título o autor..."
                value={filtros.searchTerm}
                onChange={(event) =>
                    cambiarFiltro("searchTerm", event.target.value)
                }
            />

            <div className="d-flex align-items-center gap-2">
                <label className="mb-0">Desde</label>
                <input
                    type="date"
                    className="form-control"
                    value={filtros.fechaDesde}
                    onChange={(event) =>
                        cambiarFiltro("fechaDesde", event.target.value)
                    }
                />
            </div>

            <div className="d-flex align-items-center gap-2">
                <label className="mb-0">Hasta</label>
                <input
                    type="date"
                    className="form-control"
                    value={filtros.fechaHasta}
                    onChange={(event) =>
                        cambiarFiltro("fechaHasta", event.target.value)
                    }
                />
            </div>

            <div className="d-flex align-items-center gap-2">
                <label className="mb-0">Leídos</label>
                <select
                    className="form-select"
                    value={filtros.leidos == null ? "null" : String(filtros.leidos)}
                    onChange={(event) =>
                        cambiarFiltro(
                            "leidos",
                            event.target.value === "null"
                                ? null
                                : event.target.value === "true"
                        )
                    }
                >
                    <option value="null">Todos</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>
            </div>

            <div className="d-flex align-items-center gap-2">
                <label className="mb-0">Abandonados</label>
                <select
                    className="form-select"
                    value={filtros.abandonados == null ? "null" : String(filtros.abandonados)}
                    onChange={(event) =>
                        cambiarFiltro(
                            "abandonados",
                            event.target.value === "null"
                                ? null
                                : event.target.value === "true"
                        )
                    }
                >
                    <option value="null">Todos</option>
                    <option value="true">Sí</option>
                    <option value="false">No</option>
                </select>
            </div>

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