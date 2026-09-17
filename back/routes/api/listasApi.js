const express = require('express');
const { obtenerListas, obtenerLista, nuevaLista, actualizarLista, borrarLista, actualizarRegistrosLista } = require('../../services/listaService');

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

router.get('/:id', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await obtenerLista(req.params.id, idUsuario);
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

router.put('/:id/registros', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        await actualizarRegistrosLista(req.body, req.params.id, idUsuario);

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