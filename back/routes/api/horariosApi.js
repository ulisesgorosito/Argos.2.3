const express = require(`express`);
const { nuevoHorario, actualizarHorario, borrarHorario } = require("../../services/horariosService");

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {

        const idUsuario = req.session.id_usuario;
        const response = await nuevoHorario(req.body, idUsuario);
        res.status(201).json(response);
    }
    catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
    try {

        const idUsuario = req.session.id_usuario;
        const response = await actualizarHorario(req.body, req.params.id, idUsuario);

        res.sendStatus(204);;
    }
    catch (error) {
        next(error);
    }
})


router.delete('/:id', async (req, res, next) => {
    try {
        const idUsuario = req.session.id_usuario;
        await borrarHorario(req.params.id, idUsuario);

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});

module.exports = router;