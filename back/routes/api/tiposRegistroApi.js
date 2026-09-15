const express = require('express');

const { getTiposRegistros, insertTipoRegistro, updateTipoRegistro, deleteTipoRegistroById } = require('../../models/tiposRegistrosModel');

const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const idUsuario = req.session.id_usuario;

        const data = await getTiposRegistros(idUsuario);

        res.json(data);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/', async function (req, res, next) {
    try {
        const idUsuario = req.session.id_usuario;

        const result = await insertTipoRegistro(req.body, idUsuario);

        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        const idUsuario = req.session.id_usuario;
        const id = req.params.id;

        const result = await updateTipoRegistro(req.body, id, idUsuario);

        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        const id = req.params.id;

        const result = await deleteTipoRegistroById(id);

        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;