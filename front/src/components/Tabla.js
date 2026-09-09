import Link from "next/link";

export function Tabla({
    data,
    columns,
    editPath,
    deletePath
}) {

    return (
        <table className="data-table">
            <thead>
                <tr>
                    {columns.map((column) => (
                        <th key={column.key}>
                            {column.title}
                        </th>
                    ))}
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody>
                {data.length === 0 ? (
                    <tr>
                        <td
                            colSpan={columns.length + 1}
                            className="text-center text-muted"
                        >
                            No hay registros creados
                        </td>
                    </tr>
                ) : (
                    data.map((row) => (
                        <tr key={row.id}>
                            {columns.map((column) => (
                                <td key={column.key}>
                                    {row[column.key]}
                                </td>
                            ))}

                            <td className="actions">
                                <Link
                                    href={`${editPath}/${row.id}`}
                                    className="btn-action btn-edit"
                                    title="Editar"
                                >
                                    <i className="bi bi-pencil"></i>
                                </Link>

                                <Link
                                    href={`${deletePath}/${row.id}`}
                                    className="btn-action btn-delete"
                                    title="Eliminar"
                                >
                                    <i className="bi bi-trash"></i>
                                </Link>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}
