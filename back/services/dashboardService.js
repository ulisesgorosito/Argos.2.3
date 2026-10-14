import { getActividadesDashboard } from "../models/actividadesModel.js";
import { getRegistrosDeListasDashboard } from "../models/listasModel.js";

export async function obtenerActividadesYListas(idUsuario) {
    const ahora = new Date();
    const diaActual = ahora.getDay();
    const horaActual = [
        String(ahora.getHours()).padStart(2, "0"),
        String(ahora.getMinutes()).padStart(2, "0"),
        String(ahora.getSeconds()).padStart(2, "0")
    ].join(":");

    const [registros, filasActividades] = await Promise.all([
        getRegistrosDeListasDashboard(idUsuario),
        getActividadesDashboard(idUsuario, diaActual, horaActual)
    ]);

    const listas = new Map();

    for (const registro of registros) {
        if (!listas.has(registro.idLista)) {
            listas.set(registro.idLista, {
                id: registro.idLista,
                nombre: registro.nombreLista,
                cantidadRegistros: 0,
                registros: []
            });
        }

        const lista = listas.get(registro.idLista);

        if (registro.idRegistroLista !== null) {
            lista.cantidadRegistros++;

            if (lista.registros.length < 3) {
                lista.registros.push({
                    id: registro.idRegistro,
                    idRegistroLista: registro.idRegistroLista,
                    titulo: registro.titulo,
                    autorias: registro.autorias
                });
            }
        }
    }

    const actividades = new Map();

    for (const fila of filasActividades) {
        if (!actividades.has(fila.id)) {
            actividades.set(fila.id, {
                id: fila.id,
                nombre: fila.nombre,
                descripcion: fila.descripcion,
                idLista: fila.idLista,
                horarios: [],
                proximoHorario: null
            });
        }

        const actividad = actividades.get(fila.id);

        if (fila.idHorario !== null) {
            const horario = {
                id: fila.idHorario,
                intSemana: fila.intSemana,
                horaDesde: fila.horaDesde,
                horaHasta: fila.horaHasta
            };

            actividad.horarios.push(horario);

            if (actividad.proximoHorario === null) {
                actividad.proximoHorario = horario;
            }
        }
    }

    const actividadesHoy = [...actividades.values()].map(actividad => ({
        id: actividad.id,
        nombre: actividad.nombre,
        descripcion: actividad.descripcion,
        horarios: actividad.horarios,
        proximoHorario: actividad.proximoHorario,
        lista: actividad.idLista
            ? listas.get(actividad.idLista) ?? null
            : null
    }));

    const listasDTO = [...listas.values()].map(lista => {
        const horarios = filasActividades
            .filter(actividad => actividad.idLista === lista.id)
            .filter(actividad => actividad.idHorario !== null)
            .map(actividad => ({
                id: actividad.idHorario,
                intSemana: actividad.intSemana,
                horaDesde: actividad.horaDesde,
                horaHasta: actividad.horaHasta
            }));

        const obtenerMinutos = hora => {
            const [horas, minutos] = String(hora)
                .split(":")
                .map(Number);

            return horas * 60 + minutos;
        };

        const minutosActuales =
            ahora.getHours() * 60 + ahora.getMinutes();

        const horariosOrdenados = horarios
            .filter(horario =>
                horario.intSemana !== diaActual ||
                obtenerMinutos(horario.horaHasta) > minutosActuales
            )
            .sort((a, b) => {
                const diasA = (a.intSemana - diaActual + 7) % 7;
                const diasB = (b.intSemana - diaActual + 7) % 7;

                return diasA - diasB ||
                    obtenerMinutos(a.horaDesde) -
                    obtenerMinutos(b.horaDesde);
            });

        return {
            ...lista,
            proximoHorario: horariosOrdenados[0] ?? null
        };
    });

    return {
        actividadesHoy,
        listas: listasDTO
    };
}