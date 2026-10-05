const express = require(`express`);
const { obtenerActividades, borrarActividad, nuevaActividad, actualizarActividad } = require("../../services/actividadService");

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {

        const idUsuario = req.session.id_usuario;
        const response = await obtenerActividades(idUsuario);
        res.json(response);
    }
    catch (error) {
        next(error);
    }

})

router.post('/', async (req, res, next) => {
    try {

        const idUsuario = req.session.id_usuario;
        const response = await nuevaActividad(req.body, idUsuario);
        console.log("RESPONSE POST ACTIVIDAD", response)
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try {

        const idUsuario = req.session.id_usuario;
        const response = await actualizarActividad(req.body, req.params.id, idUsuario);

        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
})


router.delete('/:id', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        await borrarActividad(req.params.id, idUsuario);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;