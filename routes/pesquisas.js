const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const pesquisa_controller = require('../controllers/pesquisa')

router.get('/pesquisa', auth, pesquisa_controller.getAll)
router.get('/pesquisa/:id', auth, pesquisa_controller.pesquisaEspecifica)
router.delete('/pesquisa/:id', auth, pesquisa_controller.deletePesquisa)
router.put('/pesquisa/:id', auth, pesquisa_controller.putPesquisa)
router.post('/pesquisa', auth, pesquisa_controller.postPesquisa)

module.exports = router;