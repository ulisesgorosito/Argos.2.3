const express = require('express');

const temasApi = require('./temasApi');
const autoriasApi = require('./autoriasApi');
const tiposRegistroApi = require('./tiposRegistroApi');
const registrosApi = require('./registrosApi');
const listasApi = require('./listasApi');
const historialesApi = require('./historialesLecturaApi');
const actividadesApi = require('./actividadesApi');
const horariosApi = require('./horariosApi');

const loginApi = require('./loginApi');
const secure = require('./secure');

const router = express.Router();

router.use('/admin', loginApi);

router.get('/auth/me', (req, res) => {
    if (req.session.id_usuario) {
        return res.json({
            id: req.session.id_usuario,
            userName: req.session.user_name
        });
    }
    res.status(401).json({
        error: 'No autenticado'
    });
});

router.use('/temas', secure, temasApi);
router.use('/autorias', secure, autoriasApi);
router.use('/tiposRegistro', secure, tiposRegistroApi);
router.use('/registros', secure, registrosApi);
router.use('/listas', secure, listasApi);
router.use('/historiales', secure, historialesApi);
router.use('/actividades', secure, actividadesApi)
router.use('/horarios', secure, horariosApi)

module.exports = router;