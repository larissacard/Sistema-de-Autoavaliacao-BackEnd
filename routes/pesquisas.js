const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const cliente = require("../server/infra/connection");

router.get('/pesquisa', auth, async (req, res, next) => {
    const dados_pesquisa = await cliente.query(`SELECT * FROM pesquisa`)
    return res.status(200).json({message: "ok", dados: dados_pesquisa.rows})
})

module.exports = router;