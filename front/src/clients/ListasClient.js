"use client";

import ListaModal from "@/components/listas/ListaModal";
import { eliminar, obtener } from "@/services/apiService";

import { useEffect, useState } from "react";

export function ListasClient() {
    const [listas, setListas] = useState([]);
    const [lista, setLista] = useState(null);
    const [registros, setRegistros] = useState([]);

    const [modalAbierto, setModalAbierto] = useState(false);

    const cargarListas = async () => {
        const listas = await obtener("/listas");
        setListas(listas);
    };

    const cargarRegistros = async (idLista) => {
        if (!idLista) {
            setRegistros([]);
            return;
        }

        const registros = await obtener(`/listas/${idLista}`);
        setRegistros(registros);
    };

    useEffect(() => {
        cargarListas();
    }, []);

    const handleNuevaLista = () => {
        setLista(null);
        setModalAbierto(true);
    };

    const onSaveLista = async () => {
        await cargarListas();
    };

    const handleEditarLista = (element) => {
        setLista(element);
        setModalAbierto(true);
    };

    const handleEliminarLista = async (element) => {
        await eliminar(`/listas/${element.id}`);

        if (lista?.id === element.id) {
            setLista(null);
            setRegistros([]);
        }

        await cargarListas();
    };

    const handleSeleccionarLista = async (element) => {
        setLista(element);
        await cargarRegistros(element.id);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="m-0">
                        Listas de lectura
                    </h2>

                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleNuevaLista}
                    >
                        <i className="bi bi-plus-lg me-1"></i>
                        Nueva lista
                    </button>
                </div>

                <div className="list-group">
                    {listas.map((element) => (
                        <div
                            key={element.id}
                            className={`list-group-item list-group-item-action ${
                                lista?.id === element.id
                                    ? "active"
                                    : ""
                            }`}
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                handleSeleccionarLista(element)
                            }
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <div className="fw-semibold">
                                        {element.nombre}
                                    </div>

                                    {element.descripcion && (
                                        <div className="small">
                                            {element.descripcion}
                                        </div>
                                    )}
                                </div>

                                <div
                                    className="d-flex gap-1"
                                    onClick={(event) =>
                                        event.stopPropagation()
                                    }
                                >
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() =>
                                            handleEditarLista(element)
                                        }
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() =>
                                            handleEliminarLista(element)
                                        }
                                    >
                                        <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-md-8">
                {lista ? (
                    <>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <div>
                                <h2 className="m-0">
                                    {lista.nombre}
                                </h2>

                                {lista.descripcion && (
                                    <div className="text-muted mt-1">
                                        {lista.descripcion}
                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                className="btn btn-primary"
                            >
                                <i className="bi bi-plus-lg me-1"></i>
                                Agregar registro
                            </button>
                        </div>

                        {registros.length === 0 ? (
                            <div className="text-muted">
                                Esta lista todavía no tiene registros.
                            </div>
                        ) : (
                            <div className="list-group">
                                {registros.map((registro, index) => (
                                    <div
                                        key={registro.id}
                                        className="list-group-item"
                                    >
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <span className="me-2">
                                                    {index + 1}.
                                                </span>

                                                <span className="fw-semibold">
                                                    {registro.titulo}
                                                </span>

                                                {registro.tipoRegistro && (
                                                    <span className="text-muted ms-2">
                                                        ({registro.tipoRegistro})
                                                    </span>
                                                )}
                                            </div>

                                            <div className="d-flex gap-1">
                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-secondary"
                                                >
                                                    <i className="bi bi-arrow-up"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-secondary"
                                                >
                                                    <i className="bi bi-arrow-down"></i>
                                                </button>

                                                <button
                                                    type="button"
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-muted">
                        Seleccioná una lista de lectura.
                    </div>
                )}
            </div>

            {modalAbierto && (
                <ListaModal
                    lista={lista}
                    onClose={() => setModalAbierto(false)}
                    onSave={onSaveLista}
                />
            )}
        </div>
    );
}