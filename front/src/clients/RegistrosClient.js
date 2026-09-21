"use client";

import { useEffect, useState } from "react";
import { Tabla } from "@/components/Tabla";
import { obtener, eliminar } from "@/services/apiService";
import AutoriaModal from "../components/autorias/AutoriaModal";
import RegistroModal from "../components/registros/RegistroModal";
import { extraerAnio } from "@/utils/dateUtil";

const columnsRegistros = [
    {
        key: "titulo",
        title: "Titulo"
    },
    {
        key: "subtitulo",
        title: "Subtitulo"
    },
    {
        key: "fechaPublicacionOriginal",
        title: "Año publicación",
        render: fecha => extraerAnio(fecha)
    },
    {
        key: "fechaEdicion",
        title: "Año Edición",
        render: fecha => extraerAnio(fecha)
    },
    {
        key: "autorias",
        title: "Autoría",
        render: autorias => autorias.map(autoria => autoria.apellido).join(", ")
    },
    {
        key: "temas",
        title: "Tema",
        render: temas => temas.map(tema => tema.nombre).join(", ")
    }
];

const columnsTiposRegistros = [
    {
        key: "nombre",
        title: "Nombre"
    },
    {
        key: "descripcion",
        title: "Descripción"
    }
];

const columnsAutorias = [
    {
        key: "nombre",
        title: "Nombre"
    },
    {
        key: "apellido",
        title: "Apellido"
    }
];

export function RegistrosClient() {

    const [seccion, setSeccion] = useState("registros");

    const [registros, setRegistros] = useState([]);
    const [tiposRegistros, setTiposRegistros] = useState([]);
    const [autorias, setAutorias] = useState([]);

    const [elemento, setElemento] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    const cargarRegistros = async () => {
        try {
            const registros = await obtener("/registros");
            console.log("REGISTROS:", registros);
            setRegistros(registros);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarTiposRegistros = async () => {
        try {
            const tiposRegistros = await obtener("/tiposRegistro");
            setTiposRegistros(tiposRegistros);
        } catch (error) {
            console.error(error);
        }
    };

    const cargarAutorias = async () => {
        try {
            const autorias = await obtener("/autorias");
            setAutorias(autorias);
        } catch (error) {
            console.error(error);
        }
    };

    const handleNuevo = async () => {
        setElemento(null);
        setModalAbierto(true);
    };

    const onSave = async () => {
        if (seccion === "registros") {
            await cargarRegistros();
        } else if (seccion === "tipos") {
            await cargarTiposRegistros();
        } else {
            await cargarAutorias();
        }
    };

    useEffect(() => {
        onSave();
    }, [seccion]);

    const handleEditar = async (elemento) => {
        setElemento(elemento);
        setModalAbierto(true);
    };

    const handleEliminar = async (elemento) => {
        try {
            if (seccion === "registros") {
                await eliminar(`/registros/${elemento.id} `);
                await cargarRegistros();
            } else if (seccion === "tipos") {
                await eliminar(`/tiposRegistro/${elemento.id} `);
                await cargarTiposRegistros();
            } else {
                await eliminar(`/autorias/${elemento.id} `);
                await cargarAutorias();
            }
        } catch (error) {
            console.error(error);
        }
    };

    const cambiarSeccion = (nuevaSeccion) => {
        setSeccion(nuevaSeccion);
        setElemento(null);
        setModalAbierto(false);
    };

    const data =
        seccion === "registros"
            ? registros
            : seccion === "tipos"
                ? tiposRegistros
                : autorias;

    const columns =
        seccion === "registros"
            ? columnsRegistros
            : seccion === "tipos"
                ? columnsTiposRegistros
                : columnsAutorias;

    const puedeEditarTipoRegistro = (tipoRegistro) => {
        return tipoRegistro.idUsuario !== null;
    };

    return (
        <>
            <div className="page-header">

                <div>
                    <button
                        type="button"
                        className={seccion === "registros" ? "btn btn-primary" : "btn btn-secondary"}
                        onClick={() => cambiarSeccion("registros")}
                    >
                        Registros
                    </button>

                    <button
                        type="button"
                        className={seccion === "tipos" ? "btn btn-primary" : "btn btn-secondary"}
                        onClick={() => cambiarSeccion("tipos")}
                    >
                        Tipos de registro
                    </button>

                    <button
                        type="button"
                        className={seccion === "autorias" ? "btn btn-primary" : "btn btn-secondary"}
                        onClick={() => cambiarSeccion("autorias")}
                    >
                        Autorías
                    </button>
                </div>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNuevo}
                >
                    {seccion === "registros"
                        ? "Nuevo registro"
                        : seccion === "tipos"
                            ? "Nuevo tipo de registro"
                            : "Nueva autoría"}
                </button>

            </div>

            <Tabla
                data={data}
                columns={columns}
                onEdit={handleEditar}
                onDelete={handleEliminar}
                canModify={seccion === "tipos" ? puedeEditarTipoRegistro : undefined}
            />

            {modalAbierto && seccion === "registros" && (
                <RegistroModal
                    registro={elemento}
                    onClose={() => setModalAbierto(false)}
                    onSave={onSave}
                />
            )}

            {modalAbierto && seccion === "tipos" && (
                <TipoRegistroModal
                    tipoRegistro={elemento}
                    onClose={() => setModalAbierto(false)}
                    onSave={onSave}
                />
            )}

            {modalAbierto && seccion === "autorias" && (
                <AutoriaModal
                    autoria={elemento}
                    onClose={() => setModalAbierto(false)}
                    onSave={onSave}
                />
            )}
        </>
    );

}
