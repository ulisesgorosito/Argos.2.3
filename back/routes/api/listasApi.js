const express = require('express');
const { obtenerListas, obtenerRegistrosDeLista, nuevaLista, actualizarLista, borrarLista, actualizarRegistrosLista } = require('../../services/listaService');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await obtenerListas(idUsuario);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/:id/registros', async (req, res, next) => {
    try {
        console.log("llego a la api")
        const idUsuario = req.session.id_usuario;
        const response = await obtenerRegistrosDeLista(req.params.id, idUsuario);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await nuevaLista(req.body, idUsuario);

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        await actualizarLista(req.body, req.params.id, idUsuario);

        res.json({ message: 'Registro actualizado correctamente' });
    } catch (error) {
        next(error);
    }
});

router.post('/:id/registros', async (req, res, next) => {
    try {
        console.log("llego al post de registros")
        const idUsuario = req.session.id_usuario;
        await actualizarRegistrosLista(req.params.id, req.body, idUsuario);

        res.json({ message: 'Registro actualizado correctamente' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
         const idUsuario = req.session.id_usuario;
        await borrarLista(req.params.id, idUsuario);

        res.json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;