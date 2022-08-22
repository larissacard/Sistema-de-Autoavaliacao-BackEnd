const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const cliente = require("../server/infra/connection");

const Pesquisa = require('../models/Pesquisa');

router.get('/pesquisa/:id', auth, async (req, res, next) => {
    const id = req.params('id')
    const pesquisa = await Pesquisa.procuraPesquisa(id);
    return res.status(200).json({message: "ok", dados: pesquisa.rows});
});

module.exports = router;