const express = require('express');

const {
    getAutorias,
    insertAutoria
} = require('../../models/autoriasModel');

const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const autorias = await getAutorias();

        res.json(autorias);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/', async function (req, res, next) {
    try {
        const obj = req.body;

        if (obj.fecha_nacimiento === '')
            obj.fecha_nacimiento = null;

        if (obj.fecha_muerte === '')
            obj.fecha_muerte = null;

        const idUsuario = req.session.id_usuario;

        const result = await insertAutoria(obj, idUsuario);

        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;