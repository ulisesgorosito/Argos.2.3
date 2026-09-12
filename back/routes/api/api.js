const express = require('express');

const temasApi = require('./temasApi');
const autoriasApi = require('./autoriasApi');
const loginApi = require('./loginApi');
const secure = require('./secure');

const router = express.Router();

router.use('/admin', loginApi);

router.get('/auth/me', (req, res) => {
    debugger;
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

module.exports = router;