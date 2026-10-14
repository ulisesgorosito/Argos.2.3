const express = require('express');
const { obtenerActividadesYListas } = require('../../services/dashboardService');

const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const idUsuario = req.session.id_usuario;

        const response = await obtenerActividadesYListas(idUsuario);
        console.dir(response, { depth: null });
        res.json(response);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;