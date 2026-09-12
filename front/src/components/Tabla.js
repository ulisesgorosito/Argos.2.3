"use client";

export function Tabla({
    data,
    columns,
    onEdit,
    onDelete
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
                                <button
                                    type="button"
                                    className="btn-action btn-edit"
                                    title="Editar"
                                    onClick={() => onEdit(row)}
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>

                                <button
                                    type="button"
                                    className="btn-action btn-delete"
                                    title="Eliminar"
                                    onClick={() => onDelete(row)}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}