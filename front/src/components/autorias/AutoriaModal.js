"use client";

import { guardarRequest } from "@/services/apiService";
import { useEffect, useState } from "react";

export default function AutoriaModal({ autoria, onClose, onSave }) {

    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");
    const [fechaMuerte, setFechaMuerte] = useState("");

    useEffect(() => {
        console.log(autoria);
        if (autoria) {
            setNombre(autoria.nombre || "");
            setApellido(autoria.apellido || "");
            setFechaNacimiento(autoria.fecha_nacimiento ? autoria.fecha_nacimiento.substring(0, 10) : "");
            setFechaMuerte(autoria.fecha_muerte ? autoria.fecha_muerte.substring(0, 10) : "");
        } else {
            setNombre("");
            setApellido("");
            setFechaNacimiento("");
            setFechaMuerte("");
        }
    }, [autoria]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await guardarRequest(
            `/autorias${autoria ? `/${autoria.id}` : ""}`,
            {
                nombre,
                apellido,
                fecha_nacimiento: fechaNacimiento || null,
                fecha_muerte: fechaMuerte || null
            },
            autoria ? "PUT" : "POST"
        );

        onSave();
        onClose();
    };


    return (
        <div className="modal-backdrop">
            <div className="modal-container">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">
                        {autoria ? "Editar autoría" : "Nueva autoría"}
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
                            placeholder="Ej: Jorge Luis"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="apellido">
                            Apellido
                        </label>

                        <input
                            id="apellido"
                            type="text"
                            value={apellido}
                            onChange={(event) => setApellido(event.target.value)}
                            placeholder="Ej: Borges"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fecha_nacimiento">
                            Fecha de nacimiento
                        </label>

                        <input
                            id="fecha_nacimiento"
                            type="date"
                            value={fechaNacimiento}
                            onChange={(event) => setFechaNacimiento(event.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="fecha_muerte">
                            Fecha de muerte
                        </label>

                        <input
                            id="fecha_muerte"
                            type="date"
                            value={fechaMuerte}
                            onChange={(event) => setFechaMuerte(event.target.value)}
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