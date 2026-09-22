import { deleteRegistroAutorias, deleteRegistroListas, deleteRegistroTemas, getRegistroById, getRegistros, insertRegistro, insertRegistroAutoria, insertRegistroLista, insertRegistroTema, updateRegistro } from "../models/registrosModel.js";
import { randomUUID } from "crypto";

export async function nuevoRegistro(obj, idUsuario) {
    try {
        const idRegistro = randomUUID();
        obj.id = idRegistro;

        // 1. Insertar en registros
        const { idsAutoria, idsTema, idsListaLectura, ...registroData } = obj;

        for (const campo in registroData) {
            if (registroData[campo] === '') {
                registroData[campo] = null;
            }
        }

        const rows = await insertRegistro(registroData, idUsuario);

        // 2. Insertar autorías
        for (const idAutoria of idsAutoria || []) {
            await insertRegistroAutoria(idRegistro, idAutoria);
        }

        // 3. Insertar temas
        for (const idTema of idsTema || []) {
            await insertRegistroTema(idRegistro, idTema);
        }

        // 4. Insertar listas de lectura
        for (const idLista of idsListaLectura || []) {
            await insertRegistroLista(idRegistro, idLista);
        }

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function actualizarRegistro(obj, idRegistro, idUsuario) {
    try {
        const { idsAutoria, idsTema, idsListaLectura, ...registroData } = obj;

        console.log(`Registro:  ${JSON.stringify(registroData)}`)
        const rows = await updateRegistro(registroData, idRegistro, idUsuario);

        await deleteRegistroAutorias(idRegistro);
        await deleteRegistroTemas(idRegistro);
        await deleteRegistroListas(idRegistro);

        for (const idAutoria of obj.idsAutoria || []) {
            await insertRegistroAutoria(idRegistro, idAutoria);
        }

        for (const idTema of obj.idsTema || []) {
            await insertRegistroTema(idRegistro, idTema);
        }

        for (const idLista of obj.idsListaLectura || []) {
            await insertRegistroLista(idRegistro, idLista);
        }

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function obtenerRegistros(idUsuario) {
    const rows = await getRegistros(idUsuario);

    const registros = Object.values(
        rows.reduce((registrosAgrupados, registro) => {
            if (!registrosAgrupados[registro.id]) {
                registrosAgrupados[registro.id] = {
                    id: registro.id,
                    idTipoRegistro: registro.idTipoRegistro,
                    titulo: registro.titulo,
                    subtitulo: registro.subtitulo,
                    fechaPublicacionOriginal: registro.fechaPublicacionOriginal,
                    fechaEdicion: registro.fechaEdicion,
                    editorialRevista: registro.editorialRevista,
                    tipoRegistro: registro.tipoRegistro,
                    autorias: [],
                    temas: []
                };
            }

            if (
                registro.idAutoria &&
                !registrosAgrupados[registro.id].autorias.some(
                    autoria => autoria.id === registro.idAutoria
                )
            ) {
                registrosAgrupados[registro.id].autorias.push({
                    id: registro.idAutoria,
                    apellido: registro.autoria
                });
            }

            if (
                registro.idTema &&
                !registrosAgrupados[registro.id].temas.some(
                    tema => tema.id === registro.idTema
                )
            ) {
                registrosAgrupados[registro.id].temas.push({
                    id: registro.idTema,
                    nombre: registro.tema
                });
            }

            return registrosAgrupados;
        }, {})
    );

    return registros;
}

export async function obtenerRegistro(idRegistro, idUsuario) {
    const rows = await getRegistroById(idRegistro, idUsuario);

    console.log("registro por id", rows)
    if (rows.length === 0) {
        return null;
    }

    const registro = {
        id: rows[0].id,
        idTipoRegistro: rows[0].idTipoRegistro,
        idOrigen: rows[0].idOrigen,
        titulo: rows[0].titulo,
        subtitulo: rows[0].subtitulo,
        fechaPublicacionOriginal: rows[0].fechaPublicacionOriginal,
        fechaEdicion: rows[0].fechaEdicion,
        editorialRevista: rows[0].editorialRevista,
        paginas: rows[0].paginas,
        lugar: rows[0].lugar,
        volumen: rows[0].volumen,
        numero: rows[0].numero,
        edicion: rows[0].edicion,
        idioma: rows[0].idioma,
        url: rows[0].url,
        codigo: rows[0].codigo,
        observacion: rows[0].observacion,
        idUsuario: rows[0].idUsuario,
        autorias: [],
        temas: [],
        listas: []
    };

    for (const row of rows) {
        if (
            row.idAutoria &&
            !registro.autorias.some(autoria => autoria.id === row.idAutoria)
        ) {
            registro.autorias.push({
                id: row.idAutoria
            });
        }

        if (
            row.idTema &&
            !registro.temas.some(tema => tema.id === row.idTema)
        ) {
            registro.temas.push({
                id: row.idTema
            });
        }

        if (
            row.idLista &&
            !registro.listas.some(lista => lista.id === row.idLista)
        ) {
            registro.listas.push({
                id: row.idLista
            });
        }
    }

    return registro;
}