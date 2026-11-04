"use client";

import { useEffect, useState } from "react";
import { obtener, guardarRequest } from "@/services/apiService";
import { DIAS_SEMANA } from "@/store/diasSemana";

export default function Home() {
    const [actividades, setActividades] = useState([]);
    const [listas, setListas] = useState([]);
    const [lecturas, setLecturas] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargarDatos = async () => {
        try {
            const data = await obtener("/dashboard");

            setActividades(data.actividadesHoy);
            setListas(data.listas);

            const response = await obtener(
                "/historiales?leidos=false&abandonados=false&pagina=1&limite=100"
            );

            setLecturas(response.historiales);
        } catch (error) {
            console.error(error);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarDatos();
    }, []);

    const actualizarLectura = async (lectura, cambios) => {
        try {
            await guardarRequest(
                `/historiales/${lectura.id}`,
                {
                    paginaActual: lectura.paginaActual,
                    ...cambios
                },
                "PUT"
            );

            await cargarDatos();
        } catch (error) {
            console.error(error);
        }
    };

    const cambiarPagina = (lectura, paginaActual) => {
        setLecturas(lecturas.map(item =>
            item.id === lectura.id
                ? { ...item, paginaActual }
                : item
        ));
    };

    if (cargando) {
        return <p>Cargando...</p>;
    }

    return (
        <div className="home">
            <h1>Argos</h1>

            <section className="mb-5">
                <h2>Actividades de hoy</h2>

                {actividades.length === 0 ? (
                    <p>No tenés actividades programadas para hoy.</p>
                ) : (
                    <div className="row g-3">
                        {actividades.map(actividad => (
                            <div className="col-md-6 col-xl-4" key={actividad.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h3 className="h5">{actividad.nombre}</h3>

                                        {actividad.horarios.map(horario => (
                                            <p key={horario.id} className="text-muted mb-1">
                                                {DIAS_SEMANA.find(
                                                    dia => dia.value === horario.intSemana
                                                )?.label}{" "}
                                                · {String(horario.horaDesde).slice(0, 5)}
                                                {" - "}
                                                {String(horario.horaHasta).slice(0, 5)}
                                            </p>
                                        ))}

                                        {actividad.lista && (
                                            <>
                                                <hr />
                                                <h4 className="h6">{actividad.lista.nombre}</h4>

                                                {actividad.lista.registros.map(registro => (
                                                    <p key={registro.idRegistroLista} className="mb-1">
                                                        {registro.autorias}, {registro.titulo}
                                                    </p>
                                                ))}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section className="mb-5">
                <h2>Lecturas actuales</h2>

                {lecturas.length === 0 ? (
                    <p>No tenés lecturas en curso.</p>
                ) : (
                    <div className="row g-2">
                        {lecturas.map(lectura => (
                            <div className="col-md-6 col-xl-4" key={lectura.id}>
                                <div className="card">
                                    <div className="card-body p-3">
                                        <h3 className="h6 mb-1">
                                            {lectura.registro.titulo}
                                        </h3>

                                        <p className="text-muted small mb-2">
                                            {lectura.registro.autorias
                                                .map(autoria => `${autoria.nombre} ${autoria.apellido}`)
                                                .join(", ")}
                                        </p>

                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <div className="progress flex-grow-1" style={{ height: "8px" }}>
                                                <div
                                                    className="progress-bar"
                                                    style={{ width: `${lectura.porcentajeAvance}%` }}
                                                />
                                            </div>
                                            <small>{lectura.porcentajeAvance}%</small>
                                        </div>

                                        <div className="d-flex align-items-center gap-2">
                                            <label className="small text-muted text-nowrap">
                                                Página actual
                                            </label>

                                            <input
                                                type="number"
                                                className="form-control form-control-sm"
                                                style={{ maxWidth: "90px" }}
                                                min="0"
                                                max={lectura.paginasTotales || undefined}
                                                value={lectura.paginaActual || 0}
                                                onChange={event =>
                                                    cambiarPagina(lectura, Number(event.target.value))
                                                }
                                                onBlur={() =>
                                                    actualizarLectura(lectura, {
                                                        paginaActual: lectura.paginaActual
                                                    })
                                                }
                                            />

                                            {lectura.paginasTotales && (
                                                <small className="text-muted text-nowrap">
                                                    de {lectura.paginasTotales}
                                                </small>
                                            )}
                                        </div>

                                        <div className="d-flex gap-2 mt-3">
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-success"
                                                onClick={() => actualizarLectura(lectura, { leido: true })}
                                            >
                                                Leído
                                            </button>

                                            <button
                                                type="button"
                                                className="btn btn-sm btn-outline-danger"
                                                onClick={() => actualizarLectura(lectura, { abandonado: true })}
                                            >
                                                Abandonar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h2>Mis listas de lectura</h2>

                {listas.length === 0 ? (
                    <p>No tenés listas de lectura.</p>
                ) : (
                    <div className="row g-3">
                        {listas.map(lista => (
                            <div className="col-md-6 col-xl-4" key={lista.id}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h3 className="h5">{lista.nombre}</h3>

                                        <p className="text-muted">
                                            {lista.cantidadRegistros} registros
                                        </p>

                                        {lista.registros.map(registro => (
                                            <p key={registro.idRegistroLista} className="mb-1">
                                                {registro.autorias}, {registro.titulo}
                                            </p>
                                        ))}

                                        <hr />

                                        {lista.proximoHorario ? (
                                            <p className="mb-0">
                                                Próximo horario:{" "}
                                                {DIAS_SEMANA.find(
                                                    dia => dia.value === lista.proximoHorario.intSemana
                                                )?.label}{" "}
                                                · {String(lista.proximoHorario.horaDesde).slice(0, 5)}
                                            </p>
                                        ) : (
                                            <p className="text-muted mb-0">
                                                Sin actividades programadas
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}