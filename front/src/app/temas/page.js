"use client";
import { useEffect, useState } from "react";
import { Tabla } from "@/components/Tabla";
import TemaModal from "@/components/temas/TemaModal";
import { obtener, eliminar } from "@/services/apiService";

const columns = [
    {
        key: "nombre",
        title: "Nombre"
    },
    {
        key: "descripcion",
        title: "Descripción"
    }
];

export default function TemasPage() {
    const [temas, setTemas] = useState([]);
    const [tema, setTema] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [modalAbierto, setModalAbierto] = useState(false);

    const cargarTemas = async () => {
        try {
            const parametros = new URLSearchParams({
                searchTerm,
                pagina: String(pagina)
            });
            const response = await obtener(`/temas?${parametros}`);
            setTemas(response.temas);
            setTotalPaginas(response.totalPaginas);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        cargarTemas();
    }, [searchTerm, pagina]);

    useEffect(() => {
        setPagina(1);
    }, [searchTerm]);


    const handleNuevo = async () => {
        setTema(null);
        setModalAbierto(true);
    };

    const onSave = async () => {
        await cargarTemas();
    };

    const handleEditar = async (tema) => {
        setTema(tema);
        setModalAbierto(true);
    };

    const handleEliminar = async (tema) => {
        try {
            await eliminar(`/temas/${tema.id}`);
            await cargarTemas();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="crud-page">
            <div className="page-header">
                <h1>Temas</h1>

                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNuevo}
                >
                    Nuevo tema
                </button>
            </div>

            <input
                type="text"
                className="form-control mb-3"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Tabla
                data={temas}
                columns={columns}
                onEdit={handleEditar}
                onDelete={handleEliminar}
                pagina={pagina}
                totalPaginas={totalPaginas}
                onPageChange={setPagina}
            />

            {modalAbierto && (
                <TemaModal
                    tema={tema}
                    onClose={() => setModalAbierto(false)}
                    onSave={onSave}
                />
            )}
        </div>
    );
}