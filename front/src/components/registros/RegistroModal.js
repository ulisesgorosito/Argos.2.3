"use client";

import { guardarRequest, obtener } from "@/services/apiService";
import { useEffect, useState } from "react";

export default function RegistroModal({ registro, onClose, onSave }) {
    const [tiposRegistro, setTiposRegistro] = useState([]);
    const [autorias, setAutorias] = useState([]);
    const [temas, setTemas] = useState([]);

    const [idTipoRegistro, setIdTipoRegistro] = useState("");
    const [idsAutoria, setIdsAutoria] = useState([]);
    const [idsTema, setIdsTema] = useState([]);

    const [titulo, setTitulo] = useState("");
    const [subtitulo, setSubtitulo] = useState("");
    const [anioPublicacionOriginal, setAnioPublicacionOriginal] = useState("");
    const [anioEdicion, setAnioEdicion] = useState("");
    const [editorialRevista, setEditorialRevista] = useState("");
    const [paginas, setPaginas] = useState("");
    const [lugar, setLugar] = useState("");
    const [volumen, setVolumen] = useState("");
    const [numero, setNumero] = useState("");
    const [edicion, setEdicion] = useState("");
    const [idioma, setIdioma] = useState("");
    const [url, setUrl] = useState("");
    const [codigo, setCodigo] = useState("");
    const [observacion, setObservacion] = useState("");

    useEffect(() => {
        async function cargarDatos() {
            const [tipos, autorias, temas] = await Promise.all([
                obtener("/tiposRegistro"),
                obtener("/autorias"),
                obtener("/temas")
            ]);

            setTiposRegistro(tipos);
            setAutorias(autorias);
            setTemas(temas);
        }

        cargarDatos();
    }, []);

    // Extrae solo el año de un string tipo "2020-05-14" o "2020"
    const extraerAnio = (valor) => {
        if (!valor) return "";

        const match = String(valor).match(/\d{4}/);
        return match ? match[0] : "";
    };

    useEffect(() => {
        if (registro) {
            setIdTipoRegistro(registro.idTipoRegistro || "");
            setIdsAutoria(registro.idsAutoria || []);
            setIdsTema(registro.idsTema || []);

            setTitulo(registro.titulo || "");
            setSubtitulo(registro.subtitulo || "");
            setAnioPublicacionOriginal(
                extraerAnio(registro.fechaPublicacionOriginal)
            );
            setAnioEdicion(extraerAnio(registro.fechaEdicion));
            setEditorialRevista(registro.editorialRevista || "");
            setPaginas(registro.paginas || "");
            setLugar(registro.lugar || "");
            setVolumen(registro.volumen || "");
            setNumero(registro.numero || "");
            setEdicion(registro.edicion || "");
            setIdioma(registro.idioma || "");
            setUrl(registro.url || "");
            setCodigo(registro.codigo || "");
            setObservacion(registro.observacion || "");
        } else {
            setIdTipoRegistro("");
            setIdsAutoria([]);
            setIdsTema([]);
            setTitulo("");
            setSubtitulo("");
            setAnioPublicacionOriginal("");
            setAnioEdicion("");
            setEditorialRevista("");
            setPaginas("");
            setLugar("");
            setVolumen("");
            setNumero("");
            setEdicion("");
            setIdioma("");
            setUrl("");
            setCodigo("");
            setObservacion("");
        }
    }, [registro]);

    const agregarAutoria = (event) => {
        const id = event.target.value;

        if (id && !idsAutoria.includes(id)) {
            setIdsAutoria([...idsAutoria, id]);
        }

        event.target.value = "";
    };

    const quitarAutoria = (id) => {
        setIdsAutoria(idsAutoria.filter((item) => item !== id));
    };

    const agregarTema = (event) => {
        const id = event.target.value;

        if (id && !idsTema.includes(id)) {
            setIdsTema([...idsTema, id]);
        }

        event.target.value = "";
    };

    const quitarTema = (id) => {
        setIdsTema(idsTema.filter((item) => item !== id));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        await guardarRequest(
            `/registros${registro ? `/${registro.id}` : ""}`,
            {
                idTipoRegistro,
                idsAutoria,
                idsTema,
                titulo,
                subtitulo: subtitulo || null,
                // Enviamos solo el año, o el 1 de enero si el backend espera fecha
                fechaPublicacionOriginal: anioPublicacionOriginal
                    ? `${anioPublicacionOriginal}-01-01`
                    : null,
                fechaEdicion: anioEdicion
                    ? `${anioEdicion}-01-01`
                    : null,
                editorialRevista: editorialRevista || null,
                paginas: paginas || null,
                lugar: lugar || null,
                volumen: volumen || null,
                numero: numero || null,
                edicion: edicion || null,
                idioma: idioma || null,
                url: url || null,
                codigo: codigo || null,
                observacion: observacion || null
            },
            registro ? "PUT" : "POST"
        );

        onSave();
        onClose();
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-container modal-lg">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">
                        {registro ? "Editar registro" : "Nuevo registro"}
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
                    {/* Título */}
                    <div className="form-group">
                        <label htmlFor="titulo">
                            Título
                        </label>

                        <input
                            id="titulo"
                            type="text"
                            value={titulo}
                            onChange={(event) => setTitulo(event.target.value)}
                            required
                        />
                    </div>

                    {/* Subtítulo */}
                    <div className="form-group">
                        <label htmlFor="subtitulo">
                            Subtítulo
                        </label>

                        <input
                            id="subtitulo"
                            type="text"
                            value={subtitulo}
                            onChange={(event) => setSubtitulo(event.target.value)}
                        />
                    </div>

                    {/* Años en la misma fila */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="anioPublicacionOriginal">
                                    Año de publicación original
                                </label>

                                <input
                                    id="anioPublicacionOriginal"
                                    type="number"
                                    min="1000"
                                    max="2100"
                                    placeholder="Ej: 1984"
                                    value={anioPublicacionOriginal}
                                    onChange={(event) => setAnioPublicacionOriginal(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="anioEdicion">
                                    Año de edición
                                </label>

                                <input
                                    id="anioEdicion"
                                    type="number"
                                    min="1000"
                                    max="2100"
                                    placeholder="Ej: 2020"
                                    value={anioEdicion}
                                    onChange={(event) => setAnioEdicion(event.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Editorial */}
                    <div className="form-group">
                        <label htmlFor="editorialRevista">
                            Editorial / revista
                        </label>

                        <input
                            id="editorialRevista"
                            type="text"
                            value={editorialRevista}
                            onChange={(event) => setEditorialRevista(event.target.value)}
                        />
                    </div>

                    {/* Tipo de registro y Temas en la misma fila */}
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="idTipoRegistro">
                                    Tipo de registro
                                </label>

                                <select
                                    id="idTipoRegistro"
                                    value={idTipoRegistro}
                                    onChange={(event) => setIdTipoRegistro(event.target.value)}
                                    required
                                >
                                    <option value="">Seleccionar tipo</option>

                                    {tiposRegistro.map((tipo) => (
                                        <option key={tipo.id} value={tipo.id}>
                                            {tipo.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="idTema">
                                    Temas
                                </label>

                                <select
                                    id="idTema"
                                    onChange={agregarTema}
                                    defaultValue=""
                                >
                                    <option value="">Seleccionar tema</option>

                                    {temas
                                        .filter((tema) => !idsTema.includes(tema.id))
                                        .map((tema) => (
                                            <option key={tema.id} value={tema.id}>
                                                {tema.nombre}
                                            </option>
                                        ))}
                                </select>

                                <div className="d-flex flex-wrap gap-2 mt-2">
                                    {idsTema.map((id) => {
                                        const tema = temas.find(
                                            (item) => item.id === id
                                        );

                                        return (
                                            <span
                                                key={id}
                                                className="badge bg-secondary d-flex align-items-center gap-2"
                                            >
                                                {tema ? tema.nombre : id}

                                                <button
                                                    type="button"
                                                    className="btn-close btn-close-white"
                                                    onClick={() => quitarTema(id)}
                                                />
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Autorías */}
                    <div className="form-group">
                        <label htmlFor="idAutoria">
                            Autorías
                        </label>

                        <select
                            id="idAutoria"
                            onChange={agregarAutoria}
                            defaultValue=""
                        >
                            <option value="">Seleccionar autoría</option>

                            {autorias
                                .filter((autoria) => !idsAutoria.includes(autoria.id))
                                .map((autoria) => (
                                    <option key={autoria.id} value={autoria.id}>
                                        {autoria.nombre} {autoria.apellido}
                                    </option>
                                ))}
                        </select>

                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {idsAutoria.map((id) => {
                                const autoria = autorias.find(
                                    (item) => item.id === id
                                );

                                return (
                                    <span
                                        key={id}
                                        className="badge bg-secondary d-flex align-items-center gap-2"
                                    >
                                        {autoria
                                            ? `${autoria.nombre} ${autoria.apellido}`
                                            : id}

                                        <button
                                            type="button"
                                            className="btn-close btn-close-white"
                                            onClick={() => quitarAutoria(id)}
                                        />
                                    </span>
                                );
                            })}
                        </div>
                    </div>

                    {/* Sección desplegable opcional */}
                    <details className="mt-4">
                        <summary className="mb-3" style={{ cursor: "pointer", fontWeight: "600" }}>
                            Campos opcionales
                        </summary>

                        <div className="form-group">
                            <label htmlFor="paginas">
                                Páginas
                            </label>

                            <input
                                id="paginas"
                                type="text"
                                value={paginas}
                                onChange={(event) => setPaginas(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lugar">
                                Lugar
                            </label>

                            <input
                                id="lugar"
                                type="text"
                                value={lugar}
                                onChange={(event) => setLugar(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="volumen">
                                Volumen
                            </label>

                            <input
                                id="volumen"
                                type="text"
                                value={volumen}
                                onChange={(event) => setVolumen(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="numero">
                                Número
                            </label>

                            <input
                                id="numero"
                                type="text"
                                value={numero}
                                onChange={(event) => setNumero(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="edicion">
                                Edición
                            </label>

                            <input
                                id="edicion"
                                type="text"
                                value={edicion}
                                onChange={(event) => setEdicion(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="idioma">
                                Idioma
                            </label>

                            <input
                                id="idioma"
                                type="text"
                                value={idioma}
                                onChange={(event) => setIdioma(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="url">
                                URL
                            </label>

                            <input
                                id="url"
                                type="url"
                                value={url}
                                onChange={(event) => setUrl(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="codigo">
                                Código
                            </label>

                            <input
                                id="codigo"
                                type="text"
                                value={codigo}
                                onChange={(event) => setCodigo(event.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="observacion">
                                Observación
                            </label>

                            <textarea
                                id="observacion"
                                value={observacion}
                                onChange={(event) => setObservacion(event.target.value)}
                            />
                        </div>
                    </details>

                    <div className="d-flex justify-content-end gap-2 mt-4">
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