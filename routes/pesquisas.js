const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const cliente = require("../server/infra/connection");
const pesquisa_controller = require('../controllers/pesquisa')

const Pesquisa = require('../models/Pesquisa');

router.get('/pesquisa/:id', auth, pesquisa_controller.pesquisa);

module.exports = router;