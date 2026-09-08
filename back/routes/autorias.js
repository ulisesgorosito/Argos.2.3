var express = require('express');
const { getAutorias, insertAutoria } = require('../models/autoriasModel');

var router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        var autorias = await getAutorias();

        res.render('registros/registros', {
            layout: 'layout',
            autorias: autorias
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.get('/agregar', function (req, res) {
    res.render('autorias/agregar', {
        layout: 'layout'
    });
});

router.post('/agregar', async function (req, res, next) {
    try {
        var obj = req.body;

        if (obj.fecha_nacimiento === '')
            obj.fecha_nacimiento = null;

        if (obj.fecha_muerte === '')
            obj.fecha_muerte = null;

        var idUsuario = req.session.id_usuario
        var result = await insertAutoria(obj, idUsuario);
        res.redirect('/autorias');
    }
    catch (error) {
        next(error);
    }
});

module.exports = router;