"use client";

import { useEffect, useRef, useState } from "react";

import { obtener, guardarRequest } from "@/services/apiService";

export default function HistorialLecturaModal({ historial, onClose, onSave }) {
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [primeraPagina, setPrimeraPagina] = useState("");
    const [ultimaPagina, setUltimaPagina] = useState("");
    const [paginaActual, setPaginaActual] = useState("");
    const [idRegistro, setIdRegistro] = useState("");
    const [registros, setRegistros] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownAbierto, setDropdownAbierto] = useState(false);
    const [cargandoRegistros, setCargandoRegistros] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const cargarRegistros = async () => {
            try {
                setCargandoRegistros(true);
                const registros = await obtener("/registros");
                setRegistros(registros);
            } catch (error) {
                console.error(error);
            } finally {
                setCargandoRegistros(false);
            }
        };

        cargarRegistros();
    }, []);

    useEffect(() => {
        if (historial) {
            setFechaInicio(historial.fechaInicio ? historial.fechaInicio.substring(0, 10) : "" );
            setFechaFin(historial.fechaFin ? historial.fechaFin.substring(0, 10) : "");
            setPrimeraPagina(historial.primeraPagina);
            setUltimaPagina(historial.ultimaPagina);
            setPaginaActual(historial.paginaActual);
            setIdRegistro(historial.idRegistro);

            const registro = registros.find(
                registro => registro.id === historial.idRegistro
            );

            setSearchTerm(registro?.titulo ?? "");
        } else {
            setFechaInicio("");
            setFechaFin("");
            setPrimeraPagina("");
            setUltimaPagina("");
            setPaginaActual("");
            setIdRegistro("");
            setSearchTerm("");
        }
    }, [historial, registros]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownAbierto(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const opcionesFiltradas = registros.filter((registro) =>
        registro.titulo
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            fechaInicio,
            fechaFin,
            primeraPagina: Number(primeraPagina),
            ultimaPagina: Number(ultimaPagina),
            paginaActual: Number(paginaActual),
            idRegistro
        };

        await guardarRequest(
            `/historiales${historial ? `/${historial.id}` : ""}`,
            data,
            historial ? "PUT" : "POST"
        );

        onSave();
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">
                        {historial
                            ? "Editar historial de lectura"
                            : "Nuevo historial de lectura"}
                    </h2>

                    <button
                        type="button"
                        className="btn"
                        onClick={onClose}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <form className="crud-form" onSubmit={handleSubmit}>
                    <div
                        className="form-group position-relative"
                        ref={dropdownRef}
                    >
                        <label htmlFor="registro">
                            Registro
                        </label>

                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="bi bi-search"></i>
                            </span>

                            <input
                                id="registro"
                                type="text"
                                className="form-control"
                                placeholder="Buscar registro..."
                                value={searchTerm}
                                onChange={(event) => {
                                    setSearchTerm(event.target.value);
                                    setDropdownAbierto(true);
                                    setIdRegistro("");
                                }}
                                onFocus={() => setDropdownAbierto(true)}
                                required
                            />
                        </div>

                        {dropdownAbierto && (
                            <div
                                className="list-group position-absolute w-100 shadow"
                                style={{
                                    zIndex: 1000,
                                    maxHeight: "300px",
                                    overflowY: "auto"
                                }}
                            >
                                {cargandoRegistros ? (
                                    <div className="list-group-item text-muted">
                                        Cargando...
                                    </div>
                                ) : opcionesFiltradas.length === 0 ? (
                                    <div className="list-group-item text-muted">
                                        Sin resultados
                                    </div>
                                ) : (
                                    opcionesFiltradas.map((registro) => (
                                        <button
                                            key={registro.id}
                                            type="button"
                                            className="list-group-item list-group-item-action"
                                            onClick={() => {
                                                setIdRegistro(registro.id);
                                                setSearchTerm(registro.titulo);
                                                setDropdownAbierto(false);
                                            }}
                                        >
                                            <div className="fw-semibold">
                                                {registro.titulo}
                                            </div>
                                        </button>
                                    ))
                                )}
                            </div>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="fechaInicio">
                            Fecha inicio
                        </label>

                        <input
                            id="fechaInicio"
                            type="date"
                            value={fechaInicio}
                            onChange={(event) =>
                                setFechaInicio(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fechaFin">
                            Fecha fin
                        </label>

                        <input
                            id="fechaFin"
                            type="date"
                            value={fechaFin}
                            onChange={(event) =>
                                setFechaFin(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="primeraPagina">
                            Primera página
                        </label>

                        <input
                            id="primeraPagina"
                            type="number"
                            value={primeraPagina}
                            onChange={(event) =>
                                setPrimeraPagina(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ultimaPagina">
                            Última página
                        </label>

                        <input
                            id="ultimaPagina"
                            type="number"
                            value={ultimaPagina}
                            onChange={(event) =>
                                setUltimaPagina(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="paginaActual">
                            Página actual
                        </label>

                        <input
                            id="paginaActual"
                            type="number"
                            value={paginaActual}
                            onChange={(event) =>
                                setPaginaActual(event.target.value)
                            }
                            required
                        />
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            className="btn btn-primary"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}