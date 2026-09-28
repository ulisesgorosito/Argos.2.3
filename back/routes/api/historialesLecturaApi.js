const express = require('express');
const { obtenerHistoriales, nuevoHistorial, actualizarHistorial, borrarHistorial } = require('../../services/historialLecturaService');

const router = express.Router();

router.get('/', async (req, res, next) => {

    try {

        const idUsuario = req.session.id_usuario;
        const { fechaInicio, fechaFin } = req.query;

        const response = await obtenerHistoriales(idUsuario, fechaInicio, fechaFin);

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