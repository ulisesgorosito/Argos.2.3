const express = require('express');

const { getUser } = require('../../models/usuariosModels');
const router = express.Router();

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
        req.session.user_name = user.userName;
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

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                error: 'Error cerrando sesión'
            });
        }

        res.clearCookie('connect.sid');
        res.status(200).json({
            message: 'Sesión cerrada'
        });
    });
});

module.exports = router;