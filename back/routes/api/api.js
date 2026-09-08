const express = require('express');

const temasApi = require('./temasApi');
const autoriasApi = require('./autoriasApi');

const router = express.Router();

router.use('/temas', temasApi);
router.use('/autorias', autoriasApi);

module.exports = router;