"use client";

import { guardarRequest } from "@/services/apiService";
import { useEffect, useState } from "react";

export default function TemaModal({ tema, onClose, onSave }) {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");

    useEffect(() => {
        if (tema) {
            setNombre(tema.nombre || "");
            setDescripcion(tema.descripcion || "");
        } else {
            setNombre("");
            setDescripcion("");
        }
    }, [tema]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        await guardarRequest(
            `/temas${tema ? `/${tema.id}` : ""} `,
            {
                nombre,
                descripcion
            },
            tema ? "PUT" : "POST"
        );

        onSave();
        onClose();
    };


    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">
                        {tema ? "Editar tema" : "Nuevo tema"}
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
                    <div className="form-group">
                        <label htmlFor="nombre">
                            Nombre
                        </label>

                        <input
                            id="nombre"
                            type="text"
                            value={nombre}
                            onChange={(event) => setNombre(event.target.value)}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="descripcion">
                            Descripción
                        </label>

                        <textarea
                            id="descripcion"
                            value={descripcion}
                            onChange={(event) => setDescripcion(event.target.value)}
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
