"use client";

import ListaModal from "@/components/listas/ListaModal";
import SearchableSelect from "@/components/SearchableSelect";
import { eliminar, guardarRequest, obtener } from "@/services/apiService";
import { useEffect, useRef, useState } from "react";
import { DragDropProvider } from "@dnd-kit/react";
import { isSortable } from "@dnd-kit/react/sortable";
import RegistroOrdenable from "@/components/listas/RegistroOrdenable";

export default function ListasPage() {
    const [listas, setListas] = useState([]);
    const [lista, setLista] = useState(null);
    const [temas, setTemas] = useState([]);
    const [idsTemas, setIdsTemas] = useState([]);
    const [registrosDropdown, setRegistrosDropdown] = useState([]);
    const [registrosDeLista, setRegistrosDeLista] = useState([]);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [cargandoRegistros, setCargandoRegistros] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchTermDropdown, setSearchTermDropdown] = useState("");
    const [dropdownAbierto, setDropdownAbierto] = useState(false);
    const [hayCambios, setHayCambios] = useState(false);
    const [descripcionExpandida, setDescripcionExpandida] = useState(false);

    const dropdownRef = useRef(null);

    const cargarListas = async () => {
        const listas = await obtener("/listas");
        setListas(listas);
    };

    const cargarTemas = async () => {
        try {
            const temas = await obtener("/dropdown/temas");
            setTemas(temas);
        } catch (error) {
            console.error(error);
            setTemas([]);
        }
    };

    const cargarRegistrosDropdown = async () => {
        try {
            setCargandoRegistros(true);
            const registros = await obtener("/dropdown/registros");
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

        try {
            const parametros = new URLSearchParams({
                searchTerm,
                idsTemas: idsTemas.join(",")
            });

            const registros = await obtener(
                `/listas/${idLista}/registros?${parametros}`
            );

            setRegistrosDeLista(
                registros.map(registro => ({
                    id: registro.idRegistro,
                    idRegistroLista: registro.idRegistroLista,
                    titulo: registro.titulo,
                    autorias: registro.autorias
                }))
            );
        } catch (error) {
            console.error(error);
            setRegistrosDeLista([]);
        }
    };

    useEffect(() => {
        cargarListas();
        cargarTemas();
        cargarRegistrosDropdown();
    }, []);

    // Lista: reacciona a searchTerm e idsTemas (con debounce)
    useEffect(() => {
        if (!lista?.id) return;

        const timer = setTimeout(() => {
            cargarRegistrosDeLista(lista.id);
        }, 300);

        return () => clearTimeout(timer);
    }, [lista?.id, searchTerm, idsTemas]);

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

    const handleSeleccionarLista = (element) => {
        setLista(element);
        setHayCambios(false);
    };

    const handleAgregarRegistro = (opcion) => {
        const nuevo = {
            id: opcion.id,
            idRegistroLista: null,
            key: crypto.randomUUID(),
            titulo: opcion.titulo,
            autorias: opcion.autorias
        };

        setRegistrosDeLista(registros => [...registros, nuevo]);
        setHayCambios(true);
        setSearchTermDropdown("");
        setDropdownAbierto(false);
    };

    const handleEliminarRegistro = (index) => {
        const nuevos = registrosDeLista.filter(
            (_, i) => i !== index
        );

        setRegistrosDeLista(nuevos);
        setHayCambios(true);
    };

    const handleGuardarRegistros = async () => {
        if (!lista?.id) return;

        const payload = registrosDeLista.map(registro => ({
            id: registro.id,
            idRegistroLista: registro.idRegistroLista
        }));

        await guardarRequest(
            `/listas/${lista.id}/registros`,
            payload,
            "POST"
        );

        setHayCambios(false);
    };

    const handleReordenarRegistros = (event) => {
        if (event.canceled) return;

        const { source } = event.operation;

        if (!isSortable(source)) return;

        const { initialIndex, index } = source;

        if (initialIndex === index) return;

        setRegistrosDeLista(registros => {
            const nuevos = [...registros];
            const [registro] = nuevos.splice(initialIndex, 1);

            nuevos.splice(index, 0, registro);

            return nuevos;
        });

        setHayCambios(true);
    };

    const handleToggleFavorita = async (element) => {
        await guardarRequest(
            `/listas/${element.id}`,
            { favorita: !element.favorita },
            "PUT"
        );

        await cargarListas();
    };

    // Filtrado en cliente del dropdown (el endpoint no acepta parámetros)
    const registrosDropdownFiltrados = searchTermDropdown.trim() === ""
        ? registrosDropdown
        : registrosDropdown.filter(opcion => {
            const term = searchTermDropdown.toLowerCase();
            const titulo = (opcion.titulo ?? "").toLowerCase();
            const subtitulo = (opcion.subtitulo ?? "").toLowerCase();
            const autorias = (opcion.autorias ?? "").toLowerCase();

            return (
                titulo.includes(term) ||
                subtitulo.includes(term) ||
                autorias.includes(term)
            );
        });

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
                    {listas.map(element => (
                        <div
                            key={element.id}
                            className={`list-group-item list-group-item-action ${lista?.id === element.id ? "active" : ""
                                }`}
                            style={{ cursor: "pointer" }}
                            onClick={() => handleSeleccionarLista(element)}
                        >
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <div className="fw-semibold">
                                        {element.nombre}
                                    </div>

                                    {element.descripcion && (
                                        <details
                                            className="small mt-1"
                                            onClick={event => event.stopPropagation()}
                                        >
                                            <summary style={{ cursor: "pointer" }}>
                                                Ver descripción
                                            </summary>
                                            <div className="mt-1">
                                                {element.descripcion}
                                            </div>
                                        </details>
                                    )}

                                    <div className="small text-muted">
                                        {element.cantidadRegistros} registros
                                    </div>
                                </div>

                                <div
                                    className="d-flex gap-1"
                                    onClick={event => event.stopPropagation()}
                                >
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-warning"
                                        onClick={() => handleToggleFavorita(element)}
                                    >
                                        <i className={`bi ${element.favorita ? "bi-star-fill" : "bi-star"
                                            }`}></i>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => handleEditarLista(element)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleEliminarLista(element)}
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
                    <><div className="d-flex justify-content-between align-items-start mb-3">
                        <div>
                            <h2 className="m-0">
                                {lista.nombre}
                            </h2>

                            {lista.descripcion && (
                                <div className="text-muted mt-1">
                                    {lista.descripcion.length <= 150 ? (
                                        lista.descripcion
                                    ) : (
                                        <>
                                            {descripcionExpandida
                                                ? lista.descripcion
                                                : `${lista.descripcion.substring(0, 150).trimEnd()}...`}

                                            <button
                                                type="button"
                                                className="btn btn-link btn-sm p-0 ms-1 align-baseline"
                                                onClick={() => setDescripcionExpandida(v => !v)}
                                            >
                                                {descripcionExpandida ? "Ver menos" : "Ver más"}
                                            </button>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {hayCambios && (
                            <button
                                type="button"
                                className="btn btn-success flex-shrink-0 ms-3"
                                onClick={handleGuardarRegistros}
                            >
                                <i className="bi bi-save me-1"></i>
                                Guardar
                            </button>
                        )}
                    </div>

                        <div className="mb-3" ref={dropdownRef}>
                            <div className="position-relative">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <i className="bi bi-search"></i>
                                    </span>

                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Buscar registro para agregar..."
                                        value={searchTermDropdown}
                                        onChange={event => {
                                            setSearchTermDropdown(event.target.value);
                                        }}
                                        onFocus={() => setDropdownAbierto(true)}
                                    />
                                </div>

                                {dropdownAbierto && (
                                    <div
                                        className="list-group position-absolute w-100 shadow"
                                        style={{
                                            zIndex: 1000,
                                            maxHeight: "300px",
                                            overflowY: "auto",
                                            top: "100%",
                                            left: 0
                                        }}
                                    >
                                        {cargandoRegistros ? (
                                            <div className="list-group-item text-muted">
                                                Cargando...
                                            </div>
                                        ) : registrosDropdownFiltrados.length === 0 ? (
                                            <div className="list-group-item text-muted">
                                                Sin resultados
                                            </div>
                                        ) : (
                                            registrosDropdownFiltrados.map(opcion => (
                                                <button
                                                    key={opcion.id}
                                                    type="button"
                                                    className="list-group-item list-group-item-action"
                                                    onClick={() => handleAgregarRegistro(opcion)}
                                                >
                                                    <div className="fw-semibold">
                                                        {opcion.autorias ? `${opcion.autorias}, ` : ""}{opcion.titulo}
                                                    </div>

                                                    {opcion.subtitulo && (
                                                        <div className="small text-muted">
                                                            {opcion.subtitulo}
                                                        </div>
                                                    )}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="mt-2 d-flex align-items-center gap-2">
                                <div className="flex-grow-1">
                                    <SearchableSelect
                                        opciones={temas}
                                        value={idsTemas}
                                        onChange={value => {
                                            setIdsTemas(value);
                                        }}
                                        placeholder="Filtrar por temas..."
                                        multiple={true}
                                    />
                                </div>

                                {idsTemas.length > 0 && (
                                    <span className="badge bg-primary">
                                        {idsTemas.length} {idsTemas.length === 1 ? "tema" : "temas"}
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-text">
                                <i className="bi bi-funnel"></i>
                            </span>

                            <input
                                type="text"
                                className="form-control"
                                placeholder="Filtrar por registro o autoría..."
                                value={searchTerm}
                                onChange={event => {
                                    setSearchTerm(event.target.value);
                                }}
                            />
                        </div>

                        {registrosDeLista.length === 0 ? (
                            <div className="text-muted">
                                No tiene registros.
                            </div>
                        ) : (
                            <DragDropProvider
                                onDragEnd={handleReordenarRegistros}
                            >
                                <div className="list-group">
                                    {registrosDeLista.map((registro, index) => (
                                        <RegistroOrdenable
                                            key={registro.idRegistroLista ?? registro.key}
                                            registro={registro}
                                            index={index}
                                            handleEliminarRegistro={handleEliminarRegistro}
                                        />
                                    ))}
                                </div>
                            </DragDropProvider>
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