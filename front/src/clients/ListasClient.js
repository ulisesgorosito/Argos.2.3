"use client";

import ListaModal from "@/components/listas/ListaModal";
import { eliminar, guardarRequest, obtener } from "@/services/apiService";
import { useEffect, useMemo, useRef, useState } from "react";

export function ListasClient() {
    const [listas, setListas] = useState([]);
    const [lista, setLista] = useState(null);
    const [registrosDropdown, setRegistrosDropdown] = useState([]);
    const [registrosDeLista, setRegistrosDeLista] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [cargandoRegistros, setCargandoRegistros] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [dropdownAbierto, setDropdownAbierto] = useState(false);
    const [hayCambios, setHayCambios] = useState(false);

    const dropdownRef = useRef(null);

    const cargarListas = async () => {
        const listas = await obtener("/listas");
        setListas(listas);
    };

    const cargarRegistrosDropdown = async () => {
        try {
            setCargandoRegistros(true);
            const registros = await obtener("/registros");
            setRegistrosDropdown(registros);
        } catch (error) {
            console.error(error);
            setRegistrosDropdown([]);
        } finally {
            setCargandoRegistros(false);
        }
    };

    const cargarRegistrosDeLista = async (idLista) => {
        if (!idLista) {
            setRegistrosDeLista([]);
            return;
        }

        const registros = await obtener(`/listas/${idLista}/registros`);

        setRegistrosDeLista(
            registros.map(registro => ({
                id: registro.idRegistro,
                idRegistroLista: registro.idRegistroLista,
                titulo: registro.titulo
            }))
        );
    };

    useEffect(() => {
        cargarListas();
        cargarRegistrosDropdown();
    }, []);

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

    const opcionesFiltradas = useMemo(() => {
        const texto = searchTerm.trim().toLowerCase();

        return registrosDropdown
            .filter(opcion => {
                if (!texto) return true;
                return opcion.titulo?.toLowerCase().includes(texto);
            });
    }, [searchTerm, registrosDropdown]);

    const handleNuevaLista = () => {
        setModalAbierto(true);
        setLista(null);
        setRegistrosDeLista([]);
        setHayCambios(false);
    };

    const onSaveLista = async () => {
        await cargarListas();
        setModalAbierto(false);
    };

    const handleEditarLista = (element) => {
        setLista(element);
        setModalAbierto(true);
    };

    const handleEliminarLista = async (element) => {
        await eliminar(`/listas/${element.id}`);

        if (lista?.id === element.id) {
            setLista(null);
            setRegistrosDeLista([]);
            setHayCambios(false);
        }

        await cargarListas();
    };

    const handleSeleccionarLista = async (element) => {
        setLista(element);
        setHayCambios(false);
        await cargarRegistrosDeLista(element.id);
    };

    const handleAgregarRegistro = (opcion) => {
        const nuevo = {
            id: opcion.id,
            idRegistroLista: null,
            key: crypto.randomUUID(),
            titulo: opcion.titulo
        };

        setRegistrosDeLista([...registrosDeLista, nuevo]);
        setHayCambios(true);
        setSearchTerm("");
        setDropdownAbierto(false);
    };

    const handleEliminarRegistro = (index) => {
        const nuevos = registrosDeLista.filter(
            (_, i) => i !== index
        );

        setRegistrosDeLista(nuevos);
        setHayCambios(true);
    };

    const handleSubirRegistro = (index) => {
        if (index === 0) return;

        const nuevos = [...registrosDeLista];

        [nuevos[index - 1], nuevos[index]] = [
            nuevos[index],
            nuevos[index - 1]
        ];

        setRegistrosDeLista(nuevos);
        setHayCambios(true);
    };

    const handleBajarRegistro = (index) => {
        if (index === registrosDeLista.length - 1) return;

        const nuevos = [...registrosDeLista];

        [nuevos[index], nuevos[index + 1]] = [
            nuevos[index + 1],
            nuevos[index]
        ];

        setRegistrosDeLista(nuevos);
        setHayCambios(true);
    };

    const handleGuardarRegistros = async () => {
        if (!lista?.id) return;

        const payload = registrosDeLista.map(registro => ({
            id: registro.id,
            idRegistroLista: registro.idRegistroLista
        }));

        console.log("payload", payload)
        await guardarRequest(
            `/listas/${lista.id}/registros`,
            payload,
            "POST"
        );

        setHayCambios(false);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="m-0">Listas de lectura</h2>

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
                            className={`list-group-item list-group-item-action ${lista?.id === element.id ? "active" : ""
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

                            {hayCambios && (
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={handleGuardarRegistros}
                                >
                                    <i className="bi bi-save me-1"></i>
                                    Guardar
                                </button>
                            )}
                        </div>

                        <div
                            className="position-relative mb-3"
                            ref={dropdownRef}
                        >
                            <div className="input-group">
                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Buscar registro para agregar..."
                                    value={searchTerm}
                                    onChange={(event) =>
                                        setSearchTerm(
                                            event.target.value
                                        )
                                    }
                                    onFocus={() =>
                                        setDropdownAbierto(true)
                                    }
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
                                        opcionesFiltradas.map(
                                            (opcion) => (
                                                <button
                                                    key={opcion.id}
                                                    type="button"
                                                    className="list-group-item list-group-item-action"
                                                    onClick={() =>
                                                        handleAgregarRegistro(
                                                            opcion
                                                        )
                                                    }
                                                >
                                                    <div className="fw-semibold">
                                                        {opcion.titulo}
                                                    </div>
                                                </button>
                                            )
                                        )
                                    )}
                                </div>
                            )}
                        </div>

                        {registrosDeLista.length === 0 ? (
                            <div className="text-muted">
                                No tiene registros.
                            </div>
                        ) : (
                            <div className="list-group">
                                {registrosDeLista.map(
                                    (registro, index) => (
                                        <div
                                            key={registro.idRegistroLista ?? registro.key}
                                            className="list-group-item"
                                        >
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div>
                                                    <span className="me-2">
                                                        {index + 1}.
                                                    </span>

                                                    <span className="fw-semibold">
                                                        {
                                                            registro.titulo
                                                        }
                                                    </span>

                                                </div>

                                                <div className="d-flex gap-1">
                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() =>
                                                            handleSubirRegistro(
                                                                index
                                                            )
                                                        }
                                                        disabled={
                                                            index ===
                                                            0
                                                        }
                                                    >
                                                        <i className="bi bi-arrow-up"></i>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-secondary"
                                                        onClick={() =>
                                                            handleBajarRegistro(
                                                                index
                                                            )
                                                        }
                                                        disabled={
                                                            index ===
                                                            registrosDeLista.length -
                                                            1
                                                        }
                                                    >
                                                        <i className="bi bi-arrow-down"></i>
                                                    </button>

                                                    <button
                                                        type="button"
                                                        className="btn btn-sm btn-outline-danger"
                                                        onClick={() =>
                                                            handleEliminarRegistro(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                )}
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
