const express = require('express');
console.log('API ROUTER CARGADO');
const temasApi = require('./temasApi');
const autoriasApi = require('./autoriasApi');
const loginApi = require('./loginApi');
const secure = require('./secure');

const router = express.Router();

router.use('/admin', loginApi);

router.use('/temas', secure, temasApi);

router.use('/autorias', secure, autoriasApi);

module.exports = router;