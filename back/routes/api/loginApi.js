const express = require('express');

const { getUser } = require('../../models/usuariosModels');
const router = express.Router();
console.log('LOGIN API CARGADO');
router.post('/login', async (req, res) => {

    try {

        const { usuario, password } = req.body;

        const user = await getUser(usuario, password);

        if (!user) {
            return res.status(401).json({
                error: 'Usuario o contraseña incorrectos'
            });
        }

        req.session.id_usuario = user.id;

        return res.json({
            usuario: user.userName
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            error: 'Error al iniciar sesión'
        });

    }

});

module.exports = router;