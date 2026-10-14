"use client";

import { useEffect, useState } from "react";
import { obtener } from "@/services/apiService";
import { DIAS_SEMANA } from "@/store/diasSemana";

export default function Home() {
    const [actividades, setActividades] = useState([]);
    const [listas, setListas] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const data = await obtener("/dashboard");

                setActividades(data.actividadesHoy);
                setListas(data.listas);
            } catch (error) {
                console.error(error);
            } finally {
                setCargando(false);
            }
        };

        cargarDatos();
    }, []);

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
                                        <h3 className="h5">
                                            {actividad.nombre}
                                        </h3>

                                        {actividad.horarios.map(horario => (
                                            <p key={horario.id} className="text-muted mb-1">
                                                {String(horario.horaDesde).slice(0, 5)}
                                                {" - "}
                                                {String(horario.horaHasta).slice(0, 5)}
                                            </p>
                                        ))}

                                        {actividad.lista && (
                                            <>
                                                <hr />
                                                <h4 className="h6">
                                                    {actividad.lista.nombre}
                                                </h4>

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