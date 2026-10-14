const express = require('express');
const { obtenerRegistrosDropdown } = require('../../services/registroService');

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

obtenerRegistrosDropdown

module.exports = router;