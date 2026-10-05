"use client";
import { useEffect, useState } from "react";
import { Tabla } from "@/components/Tabla";
import ActividadModal from "@/components/actividades/ActividadModal";
import { eliminar, obtener } from "@/services/apiService";

const columns = [
    {
        key: "nombre",
        title: "Nombre"
    },
    {
        key: "descripcion",
        title: "Descripción"
    },
    {
        key: "lista",
        title: "Lista",
        render: (lista) => lista?.nombre ?? "-"
    },
    {
        key: "horarios",
        title: "Horarios",
        render: (row) => row.horarios?.length ?? 0
    }
];

export default function ActividadesPage() {
    const [actividades, setActividades] = useState([]);
    const [actividad, setActividad] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    const cargarActividades = async () => {
        try {
            const data = await obtener("/actividades");
            setActividades(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarActividades();
    }, []);

    const handleNuevo = () => {
        setActividad(null);
        setModalAbierto(true);
    };

    const onSave = async () => {
        await cargarActividades();
    };

    const handleEditar = (actividad) => {
        setActividad(actividad);
        setModalAbierto(true);
    };

    const handleEliminar = async (actividad) => {
        try {
             await eliminar(`/actividades/${actividad.id}`);
            await cargarActividades();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="crud-page">
            <div className="page-header">
                <h1>Actividades</h1>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNuevo}
                >
                    Nueva actividad
                </button>
            </div>

            <Tabla
                data={actividades}
                columns={columns}
                onEdit={handleEditar}
                onDelete={handleEliminar}
            />

            {modalAbierto && (
                <ActividadModal
                    actividad={actividad}
                    onClose={() => setModalAbierto(false)}
                    onSave={onSave}
                />
            )}
        </div>
    );
}