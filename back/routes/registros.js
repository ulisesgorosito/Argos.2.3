var express = require('express');
const { getRegistros, insertRegistro } = require('../models/registrosModel');
const { getTiposRegistros } = require('../models/tiposRegistrosModel');
const { getAutorias } = require('../models/autoriasModel');
var router = express.Router();


router.get('/', async function (req, res, next) {
    try {
        var registros = await getRegistros();

        res.render('registros/registros', {
            layout: 'layout',
            registros: registros
        });
    }
    catch (error) {
        next(error);
    }
});


router.get('/agregar', async function (req, res) {

    var tiposRegistros = await getTiposRegistros();
    const autorias = await getAutorias();
    res.render('registros/agregar', {
        layout: 'layout',
        tiposRegistros: tiposRegistros,
        autorias: autorias
    });

});


router.post('/agregar', async function (req, res, next) {
    try {
        const idUsuario = req.session.id_usuario;
        await insertRegistro(req.body, idUsuario);
        res.redirect('/registros');
    }
    catch (error) {
        console.log(error);
        res.render('registros/agregar', {
            layout: 'layout',
            error: true,
            message: 'Hubo un problema al ingresar el nuevo registro'
        });
    }
});


module.exports = router;