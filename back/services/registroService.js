import { insertRegistro, insertRegistroAutoria, insertRegistroLista, insertRegistroTema } from "../models/registrosModel.js";
import { randomUUID } from "crypto";

export async function nuevoRegistro(obj, idUsuario) {
    try {
         const idRegistro  = randomUUID();
        console.log(`Registro id:  ${JSON.stringify(idRegistro)}`)
        obj.id = idRegistro;
        console.log(`RegistroDto:  ${JSON.stringify(obj)}`)
        // 1. Insertar en registros
        const { idsAutoria, idsTema, idsListaLectura, ...registroData } = obj;

        console.log(`Registro:  ${JSON.stringify(registroData)}`)
        const rows = await insertRegistro(registroData, idUsuario);

        // 2. Insertar autorías
        for (const idAutoria of obj.idsAutoria || []) {
            await insertRegistroAutoria(idRegistro, idAutoria);
        }

        // 3. Insertar temas
        for (const idTema of obj.idsTema || []) {
            await insertRegistroTema(idRegistro, idTema);
        }

        // 4. Insertar listas de lectura
        for (const idLista of obj.idsListaLectura || []) {
            await insertRegistroLista(idRegistro, idLista);
        }

        return rows;
    } catch (error) {
        console.log(error);
        throw error;
    }
}