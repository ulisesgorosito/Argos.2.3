var express = require('express');
const { getTemas, insertTema, deleteTemaById, getTemaById, updateTema } = require('../models/temasModels');

var router = express.Router();


router.get('/', async function (req, res, next) {
    try {
        var temas = await getTemas();

        res.render('temas/temas', {
            layout: 'layout',
            temas: temas
        });
    }
    catch (error) {
        next(error);
    }
});

router.get('/agregar', function (req, res) {

    res.render('temas/agregar', {
        layout: 'layout'
    });

});

router.post('/agregar', async function (req, res, next) {
    try {
        const idUsuario = req.session.id_usuario;
        await insertTema(req.body, idUsuario);
        res.redirect('/temas');
    }
    catch (error) {
        console.log(error);
        res.render('temas/agregar', {
            layout: 'layout',
            error: true,
            message: 'Hubo un problema al ingresar el nuevo tema'
        });
    }
});

router.get(`/eliminar/:id`, async (req, res, next) => {
    var id = req.params.id;
    await deleteTemaById(id);
    res.redirect('/temas');
})

router.get('/editar/:id', async function (req, res, next) {
        var id = req.params.id;
        let tema = await getTemaById(id);
        res.render('temas/editar', {
            layout: 'layout',
            tema: tema[0]
        });
    }
);

router.post('/editar/:id', async function (req, res, next) {
    try {
        let obj = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
        }
        await updateTema(obj, req.body.id);
        res.redirect('/temas');
    } catch (error) {
        console.log(error);
        res.render('temas/editar', {
            layout: 'layout',
            error: true,
            message: 'Hubo un problema al actualizar el tema'
        });
    }
});

module.exports = router;