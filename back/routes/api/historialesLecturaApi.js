const express = require('express');
const { obtenerHistoriales, nuevoHistorial, actualizarHistorial, borrarHistorial,
    obtenerHistorial
} = require('../../services/historialLecturaService');

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;

        const {
            fechaDesde,
            fechaHasta,
            leidos,
            abandonados,
            searchTerm,
            pagina = 1,
            limite = 10
        } = req.query;

        const filtros = {
            fechaDesde,
            fechaHasta,
            leidos: leidos === "true",
            abandonados: abandonados === "true",
            searchTerm
        };

        const response = await obtenerHistoriales(
            idUsuario,
            filtros,
            Number(pagina),
            Number(limite)
        );

        res.json(response);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {

    try {
        const idUsuario = req.session.id_usuario;

        const response = await obtenerHistorial(req.params.id, idUsuario);
        res.json(response);

    } catch (error) {

        next(error);

    }

});

router.post('/', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        const response = await nuevoHistorial(req.body, idUsuario);

        res.status(201).json(response);
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        await actualizarHistorial(req.body, req.params.id, idUsuario);

        res.json({ message: 'Historial actualizado correctamente' });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        await borrarHistorial(req.params.id, idUsuario);

        res.json({ message: 'Historial eliminado correctamente' });
    } catch (error) {
        next(error);
    }
});

module.exports = router;