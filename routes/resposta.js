const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const resposta_controller = require('../controllers/resposta')

router.get('/resposta', auth, resposta_controller.getAll)
router.get('/resposta/:id', auth, resposta_controller.getResposta)
router.post('/resposta', auth, resposta_controller.postResposta)

module.exports = router;