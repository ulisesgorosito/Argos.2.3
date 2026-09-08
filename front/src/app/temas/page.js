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

    const response = await fetch(
        `${process.env.API_BASE_URL}/temas`,
        {
            cache: "no-store"
        }
    );

    const temas = await response.json();

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
            />

        </div>
    );
}