const express = require('express');

const {
    getTemas,
    insertTema,
    deleteTemaById,
    getTemaById,
    updateTema
} = require('../../models/temasModels');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const temas = await getTemas();
        res.json(temas);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const tema = await getTemaById(req.params.id);
        res.json(tema[0]);
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;

        const tema = await insertTema(req.body, idUsuario);

        res.status(201).json(tema);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        await updateTema(req.body, req.params.id);

        res.json({ message: 'Tema actualizado correctamente' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await deleteTemaById(req.params.id);

        res.json({ message: 'Tema eliminado correctamente' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;