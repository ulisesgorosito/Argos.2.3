const express = require('express');
const { obtenerRegistrosDropdown } = require('../../services/registroService');
const {obtenerAutoriasDropdown} = require('../../services/autoriaService');

router = express.Router();
router.get('/registros', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await obtenerRegistrosDropdown(idUsuario);
        console.dir(response, { depth: null });
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/autorias', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await obtenerAutoriasDropdown(idUsuario);
        console.dir(response, { depth: null });
        res.json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = router;