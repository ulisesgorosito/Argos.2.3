const express = require('express');
const { deleteRegistroById } = require('../../models/registrosModel');
const { nuevoRegistro, actualizarRegistro, obtenerRegistros, obtenerRegistro } = require('../../services/registroService');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await obtenerRegistros(idUsuario);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await obtenerRegistro(req.params.id, idUsuario);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await nuevoRegistro(req.body, idUsuario);

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        await actualizarRegistro(req.body, req.params.id, idUsuario);

        res.json({ message: 'Registro actualizado correctamente' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
         const idUsuario = req.session.id_usuario;
        await deleteRegistroById(req.params.id, idUsuario);

        res.json({ message: 'Registro eliminado correctamente' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;