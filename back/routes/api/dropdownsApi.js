const express = require('express');
const { obtenerRegistrosDropdown } = require('../../services/registroService');
const {obtenerAutoriasDropdown} = require('../../services/autoriaService');
const { obtenerListasDropdown } = require('../../services/listaService');
const { obtenerTemasDropdown } = require('../../services/temaService');
const { obtenerTiposRegistroDropdown } = require('../../services/tipoRegistro');

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

router.get('/listas', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await obtenerListasDropdown(idUsuario);
        console.dir(response, { depth: null });
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/temas', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await obtenerTemasDropdown(idUsuario);
        console.dir(response, { depth: null });
        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/tiposRegistros', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await obtenerTiposRegistroDropdown(idUsuario);
        console.dir(response, { depth: null });
        res.json(response);
    } catch (error) {
        next(error);
    }
});

module.exports = router;