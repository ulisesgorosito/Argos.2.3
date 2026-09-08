var express = require('express');
var usuariosModel = require('../../models/usuariosModels');

var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin/login', {
        layout: 'layout',     
        hideNav: true         
    });
});

router.post('/', async function (req, res, next) {
    try {
        const { usuario, password } = req.body;
        const user = await usuariosModel.getUser(usuario, password);

        console.log('USER:', user);

        if (user) {
            req.session.id_usuario = user.id;
            req.session.user_name = user.userName;

            req.session.save((err) => {
                if (err) {
                    console.error('Error guardando sesión:', err);
                    return next(err);
                }

                console.log('Sesión guardada:', req.session);
                res.redirect('/');
            });

        } else {
            res.render('admin/login', {
                layout: 'layout',
                hideNav: true,
                error: 'Usuario o contraseña incorrectos'
            });
        }
    } catch (error) {
        console.error('Error en login:', error);

        res.render('admin/login', {
            layout: 'layout',
            hideNav: true,
            error: 'Error al iniciar sesión'
        });
    }
});
module.exports = router;