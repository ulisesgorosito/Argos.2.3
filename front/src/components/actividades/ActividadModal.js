"use client";

import { guardarRequest, obtener, eliminar } from "@/services/apiService";
import { useEffect, useState } from "react";

const DIAS_SEMANA = [
    { value: 1, label: "Lunes" },
    { value: 2, label: "Martes" },
    { value: 3, label: "Miércoles" },
    { value: 4, label: "Jueves" },
    { value: 5, label: "Viernes" },
    { value: 6, label: "Sábado" },
    { value: 7, label: "Domingo" },
];

const horarioVacio = () => ({
    id: null,
    intSemana: 1,
    horaDesde: "",
    horaHasta: "",
});

export default function ActividadModal({ actividad, onClose, onSave }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [idLista, setIdLista] = useState("");
    const [listas, setListas] = useState([]);
    const [horarios, setHorarios] = useState([]);
    const [horariosEliminados, setHorariosEliminados] = useState([]);

    useEffect(() => {
        const cargarListas = async () => {
            try {
                const data = await obtener("/listas");
                setListas(data);
            } catch (error) {
                console.error(error);
            }
        };
        cargarListas();
    }, []);

    useEffect(() => {
        if (actividad) {
            setNombre(actividad.nombre || "");
            setDescripcion(actividad.descripcion || "");
            setIdLista(actividad.idLista || "");
            setHorarios(
                (actividad.horarios || []).map((h) => ({
                    id: h.id,
                    intSemana: h.intSemana,
                    horaDesde: h.horaDesde,
                    horaHasta: h.horaHasta,
                }))
            );
        } else {
            setNombre("");
            setDescripcion("");
            setIdLista("");
            setHorarios([]);
        }
        setHorariosEliminados([]);
    }, [actividad]);

    const handleAgregarHorario = () => {
        setHorarios([...horarios, horarioVacio()]);
    };

    const handleCambiarHorario = (index, field, value) => {
        setHorarios((prev) =>
            prev.map((h, i) => (i === index ? { ...h, [field]: value } : h))
        );
    };

    const handleQuitarHorario = (index) => {
        setHorarios((prev) => {
            const copia = [...prev];
            const [removido] = copia.splice(index, 1);
            if (removido?.id) {
                setHorariosEliminados((ids) => [...ids, removido.id]);
            }
            return copia;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // 1. Guardar actividad
            const payload = {
                nombre,
                descripcion,
                idLista,
            };

            const response = await guardarRequest(
                `/actividades${actividad ? `/${actividad.id}` : ""}`,
                payload,
                actividad ? "PUT" : "POST"
            );
            console.log("RESPUESTA DE POST FRONT", response)
            const idActividad = actividad?.id || response;

            if (!idActividad) {
                throw new Error("No se pudo obtener el id de la actividad");
            }

            // 2. Eliminar horarios quitados
            for (const idHorario of horariosEliminados) {
                await eliminar(`/horarios/${idHorario}`);
            }

            // 3. Guardar horarios
            for (const horario of horarios) {
                const horarioPayload = {
                    idActividad,
                    intSemana: horario.intSemana,
                    horaDesde: horario.horaDesde,
                    horaHasta: horario.horaHasta,
                };

                if (horario.id) {
                    await guardarRequest(
                        `/horarios/${horario.id}`,
                        horarioPayload,
                        "PUT"
                    );
                } else {
                    await guardarRequest("/horarios", horarioPayload, "POST");
                }
            }

            onSave();
            onClose();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">
                        {actividad ? "Editar actividad" : "Nueva actividad"}
                    </h2>
                    <button type="button" className="btn" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <form className="crud-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion">Descripción</label>
                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="idLista">Lista</label>
                        <select
                            id="idLista"
                            value={idLista}
                            onChange={(e) => setIdLista(e.target.value)}
                        >
                            <option value="">Seleccionar lista...</option>
                            {listas.map((lista) => (
                                <option key={lista.id} value={lista.id}>
                                    {lista.nombre}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <label className="m-0">Horarios</label>
                            <button
                                type="button"
                                className="btn btn-secondary btn-sm"
                                onClick={handleAgregarHorario}
                            >
                                + Agregar horario
                            </button>
                        </div>

                        {horarios.length === 0 && (
                            <p className="text-muted m-0">Sin horarios.</p>
                        )}

                        {horarios.map((horario, index) => (
                            <div
                                key={horario.id ?? `nuevo-${index}`}
                                className="d-flex gap-2 align-items-end mb-2"
                            >
                                <div className="form-group m-0 flex-grow-1">
                                    <label>Día</label>
                                    <select
                                        value={horario.intSemana}
                                        onChange={(e) =>
                                            handleCambiarHorario(
                                                index,
                                                "intSemana",
                                                Number(e.target.value)
                                            )
                                        }
                                        required
                                    >
                                        {DIAS_SEMANA.map((dia) => (
                                            <option key={dia.value} value={dia.value}>
                                                {dia.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group m-0">
                                    <label>Desde</label>
                                    <input
                                        type="time"
                                        value={horario.horaDesde}
                                        onChange={(e) =>
                                            handleCambiarHorario(
                                                index,
                                                "horaDesde",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <div className="form-group m-0">
                                    <label>Hasta</label>
                                    <input
                                        type="time"
                                        value={horario.horaHasta}
                                        onChange={(e) =>
                                            handleCambiarHorario(
                                                index,
                                                "horaHasta",
                                                e.target.value
                                            )
                                        }
                                        required
                                    />
                                </div>

                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => handleQuitarHorario(index)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-end gap-2">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}