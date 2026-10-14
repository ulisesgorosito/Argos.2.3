import { getActividades } from "../models/actividadesModel.js";
import { getRegistrosDeListasDashboard } from "../models/listasModel.js";

export async function obtenerActividadesYListas(idUsuario) {
    const [registros, filasActividades] = await Promise.all([
        getRegistrosDeListasDashboard(idUsuario),
        getActividades(idUsuario)
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
                nombreLista: fila.nombreLista,
                horarios: []
            });
        }

        if (fila.idHorario !== null) {
            actividades.get(fila.id).horarios.push({
                id: fila.idHorario,
                intSemana: fila.intSemana,
                horaDesde: fila.horaDesde,
                horaHasta: fila.horaHasta
            });
        }
    }

    const actividadesAgrupadas = [...actividades.values()];
    const ahora = new Date();
    const diaActual = ahora.getDay();
    const horaActual = ahora.getHours() * 60 + ahora.getMinutes();

    const obtenerMinutos = hora => {
        const [horas, minutos] = String(hora)
            .split(":")
            .map(Number);

        return horas * 60 + minutos;
    };

    const obtenerProximoHorario = horarios => {
        let proximo = null;
        let menorDiferencia = Infinity;

        for (const horario of horarios) {
            if (horario.intSemana === null) continue;

            let dias = (horario.intSemana - diaActual + 7) % 7;
            const minutos = obtenerMinutos(horario.horaDesde);

            if (dias === 0 && minutos <= horaActual) {
                dias = 7;
            }

            const diferencia = dias * 1440 + minutos;

            if (diferencia < menorDiferencia) {
                menorDiferencia = diferencia;
                proximo = horario;
            }
        }

        return proximo;
    };

    const actividadesHoy = actividadesAgrupadas
        .filter(actividad =>
            actividad.horarios.some(
                horario => horario.intSemana === diaActual
            )
        )
        .map(actividad => ({
            id: actividad.id,
            nombre: actividad.nombre,
            descripcion: actividad.descripcion,
            horarios: actividad.horarios.filter(
                horario => horario.intSemana === diaActual
            ),
            lista: actividad.idLista
                ? listas.get(actividad.idLista) ?? null
                : null
        }))
        .sort((a, b) =>
            obtenerMinutos(a.horarios[0].horaDesde) -
            obtenerMinutos(b.horarios[0].horaDesde)
        );

    const listasDTO = [...listas.values()].map(lista => {
        const horarios = actividadesAgrupadas
            .filter(actividad => actividad.idLista === lista.id)
            .flatMap(actividad => actividad.horarios);

        return {
            ...lista,
            proximoHorario: obtenerProximoHorario(horarios)
        };
    });

    return {
        actividadesHoy,
        listas: listasDTO
    };
}