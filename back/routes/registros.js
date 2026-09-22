var express = require('express');
const { insertRegistro } = require('../models/registrosModel');
const { getTiposRegistros } = require('../models/tiposRegistrosModel');
const { getAutorias } = require('../models/autoriasModel');
const { obtenerRegistros, nuevoRegistro } = require('../services/registroService');
var router = express.Router();


router.get('/', async function (req, res, next) {
    try {
        const idUsuario = req.session.id_usuario;
        var registros = await obtenerRegistros(idUsuario);
        console.log("registros", registros)
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

    const idUsuario = req.session.id_usuario;
    var tiposRegistros = await getTiposRegistros(idUsuario);
    const autorias = await getAutorias(idUsuario);
    res.render('registros/agregar', {
        layout: 'layout',
        tiposRegistros: tiposRegistros,
        autorias: autorias
    });

});


router.post('/agregar', async function (req, res, next) {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await nuevoRegistro(req.body, idUsuario);
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