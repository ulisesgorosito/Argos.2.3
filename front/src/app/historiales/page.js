"use client";
import { useEffect, useState } from "react";
import { Tabla } from "@/components/Tabla";
import { obtener, eliminar } from "@/services/apiService";
import HistorialLecturaModal from "@/components/historiales/HistorialLecturaModal";
import { extraerFecha } from "@/utils/dateUtil";

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

    const cargarHistoriales = async () => {
        try {
            const historiales = await obtener("/historiales");
            setHistoriales(historiales);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarHistoriales();
    }, []);

    const handleNuevo = () => {
        setHistorial(null);
        setModalAbierto(true);
    };

    const onSave = async () => {
        await cargarHistoriales();
    };

    const handleEditar = async (historial) => {
        await cargarHistorial(historial.id);
        setModalAbierto(true);
    };

    const handleEliminar = async (historial) => {
        try {
            await eliminar(`/historiales/${historial.id}`);
            await cargarHistoriales();
        } catch (error) {
            console.error(error);
        }
    };

    const cargarHistorial = async (id) => {
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

            <Tabla
                data={historiales}
                columns={columns}
                onEdit={handleEditar}
                onDelete={handleEliminar}
            />

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