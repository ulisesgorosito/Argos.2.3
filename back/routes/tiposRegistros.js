var express = require('express');
const { insertTipoRegistro } = require('../models/tiposRegistrosModel');
var router = express.Router();


router.get('/agregar', async function (req, res) {

    res.render('tiposregistros/agregar', {
        layout: 'layout',
    });

});

router.post('/agregar', async function (req, res, next) {
    try {
        const idUsuario = req.session.id_usuario;
        await insertTipoRegistro(req.body, idUsuario);
        res.redirect('/registros');
    }
    catch (error) {
        console.log(error);
        res.render('registros/agregar', {
            layout: 'layout',
            error: true,
            message: 'Hubo un problema al ingresar el nuevo tipo de registro'
        });
    }
});


module.exports = router;