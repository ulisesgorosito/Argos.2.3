"use client";

import { useEffect, useState } from "react";
import { Tabla } from "@/components/Tabla";
import { obtener, eliminar } from "@/services/apiService";
import HistorialLecturaModal from "@/components/historiales/HistorialLecturaModal";
import HistorialLecturaFiltro from "@/components/historiales/HistorialLecturaFiltro";
import { extraerFecha } from "@/utils/dateUtil";

const hoy = new Date();
const haceDosMeses = new Date();
haceDosMeses.setMonth(haceDosMeses.getMonth() - 2);

const obtenerFecha = fecha => {
    const anio = fecha.getFullYear();
    const mes = String(fecha.getMonth() + 1).padStart(2, "0");
    const dia = String(fecha.getDate()).padStart(2, "0");

    return `${anio}-${mes}-${dia}`;
};

const filtrosIniciales = {
    leidos: null,
    abandonados: null,
    fechaDesde: obtenerFecha(haceDosMeses),
    fechaHasta: obtenerFecha(hoy),
    searchTerm: "",
    idsTemas: []
};

const columns = [
    {
        key: "registro.titulo",
        title: "Título"
    },
    {
        key: "registro.autorias",
        title: "Autorías",
        render: autorias => autorias
            .map(autoria => `${autoria.nombre} ${autoria.apellido}`)
            .join(", ")
    },
    {
        key: "fechaInicio",
        title: "Fecha inicio",
        render: fechaInicio => extraerFecha(fechaInicio)
    },
    {
        key: "fechaFin",
        title: "Fecha fin",
        render: fechaFin => extraerFecha(fechaFin)
    },
    {
        key: "porcentajeAvance",
        title: "Avance",
        render: porcentajeAvance => `${porcentajeAvance}%`
    }
];

export default function HistorialesLecturaPage() {
    const [historiales, setHistoriales] = useState([]);
    const [historial, setHistorial] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);
    const [filtros, setFiltros] = useState(filtrosIniciales);
    const [paginaActual, setPaginaActual] = useState(1);
    const [registrosPorPagina, setRegistrosPorPagina] = useState(10);
    const [totalRegistros, setTotalRegistros] = useState(0);

    const cargarHistoriales = async () => {
        try {
            const params = new URLSearchParams({
                ...filtros,
                pagina: paginaActual,
                limite: registrosPorPagina
            });

            const response = await obtener(`/historiales?${params.toString()}`);

            setHistoriales(response.historiales);
            setTotalRegistros(response.total);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarHistoriales();
    }, [filtros, paginaActual, registrosPorPagina]);

    const cambiarFiltros = filtros => {
        setFiltros(filtros);
        setPaginaActual(1);
    };

    const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);

    const handleNuevo = () => {
        setHistorial(null);
        setModalAbierto(true);
    };

    const onSave = async () => {
        await cargarHistoriales();
    };

    const handleEditar = async historial => {
        await cargarHistorial(historial.id);
        setModalAbierto(true);
    };

    const handleEliminar = async historial => {
        try {
            await eliminar(`/historiales/${historial.id}`);
            await cargarHistoriales();
        } catch (error) {
            console.error(error);
        }
    };

    const cargarHistorial = async id => {
        try {
            const historial = await obtener(`/historiales/${id}`);
            setHistorial(historial);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="crud-page">
            <div className="page-header">
                <h1>Historiales de lectura</h1>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNuevo}
                >
                    Nuevo historial
                </button>
            </div>

            <HistorialLecturaFiltro
                filtros={filtros}
                onChange={cambiarFiltros}
            />

            <Tabla
                data={historiales}
                columns={columns}
                onEdit={handleEditar}
                onDelete={handleEliminar}
                pagina={paginaActual}
                totalPaginas={totalPaginas}
                onPageChange={setPaginaActual}
            />

            <div className="d-flex align-items-center gap-2 mt-3">
                <span>Mostrar</span>

                <select
                    className="form-select"
                    style={{ width: "auto" }}
                    value={registrosPorPagina}
                    onChange={event => {
                        setRegistrosPorPagina(Number(event.target.value));
                        setPaginaActual(1);
                    }}
                >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>

                <span>de {totalRegistros} registros</span>
            </div>

            {modalAbierto && (
                <HistorialLecturaModal
                    historial={historial}
                    onClose={() => setModalAbierto(false)}
                    onSave={onSave}
                />
            )}
        </div>
    );
}