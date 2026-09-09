import {apiFetch} from "../helpers/apiHelper";
import { Tabla } from "@/components/Tabla";

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

export default async function TemasPage() {

    const temas = await apiFetch("/temas", {
        cache: "no-store"
    });

    return (
        <div className="crud-page">
            <div className="page-header">
                <h1>Temas</h1>
                <a
                    className="btn btn-primary"
                    href="/temas/agregar"
                >
                    Nuevo tema
                </a>
            </div>

            <Tabla
                data={temas}
                columns={columns}
                editPath="/temas/editar"
                deletePath="/temas/eliminar"
            />
        </div>
    );
}
