"use client";

export function Tabla({
    data,
    columns,
    onEdit,
    onDelete,
    canModify,
    pagina = 1,
    totalPaginas = 1,
    onPageChange
}) {
    const getValue = (object, path) =>
        path.split(".").reduce((value, key) => value?.[key], object);

    return (
        <>
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
                                {columns.map((column) => {
                                    const value = getValue(row, column.key);

                                    return (
                                        <td key={column.key}>
                                            {column.render
                                                ? column.render(value, row)
                                                : value}
                                        </td>
                                    );
                                })}
                                <td className="actions">
                                    {(!canModify || canModify(row)) && (
                                        <>
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
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {totalPaginas > 1 && (
                <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
                    <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={pagina <= 1}
                        onClick={() => onPageChange(pagina - 1)}
                    >
                        Anterior
                    </button>

                    <span>
                        Página {pagina} de {totalPaginas}
                    </span>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        disabled={pagina >= totalPaginas}
                        onClick={() => onPageChange(pagina + 1)}
                    >
                        Siguiente
                    </button>
                </div>
            )}
        </>
    );
}