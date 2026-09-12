"use client";

import { useEffect, useState } from "react";

import { Tabla } from "@/components/Tabla";
import TemaModal from "@/components/temas/TemaModal";

import {
    obtenerTemas,
    eliminarTema
} from "@/services/temasService";

const columns = [
    {
        key: "nombre",
        title: "Nombre"
    },
    {
        key: "descripcion",
        title: "Descripción"
    }
];

export function TemasClient() {
    const [temas, setTemas] = useState([]);
    const [tema, setTema] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    const cargarTemas = async () => {
        try {
            const temas = await obtenerTemas();
            setTemas(temas);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarTemas();
    }, []);

    const handleNuevo = async () => {
        setTema(null);
        setModalAbierto(true);
    };

    const onSave = async () => {
        await cargarTemas();
    }

    const handleEditar = async (tema) => {
        setTema(tema);
        setModalAbierto(true);
    };

    const handleEliminar = async (tema) => {
        try {
            await eliminarTema(tema.id);
            await cargarTemas();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="page-header">
                <h1>Temas</h1>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNuevo}
                >
                    Nuevo tema
                </button>
            </div>

            <Tabla
                data={temas}
                columns={columns}
                onEdit={handleEditar}
                onDelete={handleEliminar}
            />

            {modalAbierto && (
                <TemaModal
                    tema={tema}
                    onClose={() => setModalAbierto(false)}
                   onSave={onSave}
                />
            )}
        </>
    );
}