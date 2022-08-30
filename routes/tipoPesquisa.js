const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const tipoPesquisa_controller = require('../controllers/tipoPesquisa')

router.get('/tipoPesquisa', auth, tipoPesquisa_controller.getAll)
router.get('/tipoPesquisa/:id', auth, tipoPesquisa_controller.tipoPesquisaEspecifica)
router.delete('/tipoPesquisa/:id', auth, tipoPesquisa_controller.deleteTipoPesquisa)
router.put('/tipoPesquisa/:id', auth, tipoPesquisa_controller.putTipoPesquisa)
router.post('/tipoPesquisa', auth, tipoPesquisa_controller.postTipoPesquisa)

module.exports = router;