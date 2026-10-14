"use client";

import { useSortable } from "@dnd-kit/react/sortable";

export default function RegistroOrdenable({
    registro,
    index,
    handleEliminarRegistro
}) {
    const { ref, isDragging } = useSortable({
        id: registro.idRegistroLista ?? registro.key,
        index
    });

    return (
        <div
            ref={ref}
            className="list-group-item"
            style={{
                opacity: isDragging ? 0.5 : 1
            }}
        >
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <button
                        type="button"
                        className="btn btn-sm btn-outline-secondary me-2"
                        style={{ cursor: "grab" }}
                        aria-label={`Mover ${registro.titulo}`}
                        title="Arrastrar para reordenar"
                    >
                        <i className="bi bi-grip-vertical"></i>
                    </button>

                    <span className="me-2">
                        {index + 1}.
                    </span>

                    <span className="fw-semibold">
                       {registro.autorias}, {registro.titulo}
                    </span>
                </div>

                <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleEliminarRegistro(index)}
                    aria-label={`Eliminar ${registro.titulo}`}
                    title="Eliminar registro"
                >
                    <i className="bi bi-trash"></i>
                </button>
            </div>
        </div>
    );
}