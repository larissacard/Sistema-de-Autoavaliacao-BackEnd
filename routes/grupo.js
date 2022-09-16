const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const grupo_controller = require('../controllers/grupo')

router.get('/grupos', auth, grupo_controller.getAll)
router.get('/grupos/:id', auth, grupo_controller.getOne)
router.get('/grupos/:id/pesquisas', auth, grupo_controller.getGrupoPesquisas)
router.post('/grupos', auth, grupo_controller.postGrupo)
router.put('/grupos/:id', auth, grupo_controller.putGrupo)
router.delete('/grupos/:id', auth, grupo_controller.deleteGrupo)

module.exports = router;