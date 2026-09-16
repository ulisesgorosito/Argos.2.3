const express = require('express');
const { getRegistros, getRegistroById, updateRegistro, deleteRegistroById } = require('../../models/registrosModel');
const { nuevoRegistro } = require('../../services/registroService');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await getRegistros(idUsuario);
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await getRegistroById(req.params.id, idUsuario);
        res.json(response[0]);
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
        await updateRegistro(req.body, req.params.id, idUsuario);

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