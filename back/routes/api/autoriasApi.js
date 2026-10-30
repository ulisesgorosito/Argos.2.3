const express = require('express');
const { obtenerAutorias } = require('../../services/autoriaService');
const {
    insertAutoria,
    updateAutoria,
    deleteAutoriaById
} = require('../../models/autoriasModel');

const router = express.Router();

router.get('/', async function (req, res, next) {
    try {
        const idUsuario = req.session.id_usuario;

         const {
            searchTerm = "",
            pagina = 1,
        } = req.query;

        const autorias = await obtenerAutorias(idUsuario, searchTerm, pagina);

        res.json(autorias);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.post('/', async function (req, res, next) {
    try {
        const obj = req.body;

        if (obj.fecha_nacimiento === '')
            obj.fecha_nacimiento = null;

        if (obj.fecha_muerte === '')
            obj.fecha_muerte = null;

        const idUsuario = req.session.id_usuario;

        const result = await insertAutoria(obj, idUsuario);

        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.put('/:id', async function (req, res, next) {
    try {
        console.log("ENTRO AL PUT AUTORIAS");
        const obj = req.body;

        if (obj.fecha_nacimiento === '')
            obj.fecha_nacimiento = null;

        if (obj.fecha_muerte === '')
            obj.fecha_muerte = null;

        const idUsuario = req.session.id_usuario;
        const id = req.params.id;

        const result = await updateAutoria(obj, id, idUsuario);

        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

router.delete('/:id', async function (req, res, next) {
    try {
        console.log("ENTRO AL DELETE AUTORIAS");
        const id = req.params.id;

        const result = await deleteAutoriaById(id);

        res.status(201).json(result);
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;