const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const pesquisa_controller = require('../controllers/pesquisa')

router.get('/resposta', auth, resposta_controller.getAll)
router.get('/resposta/:id', auth, resposta_controller.getReposta)
router.post('/resposta', auth, resposta_controller.postResposta)

module.exports = router;