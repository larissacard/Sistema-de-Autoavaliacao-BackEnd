const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const perguntas_controller = require('../controllers/pergunta')

router.get('/perguntas/:id', auth, perguntas_controller.perguntaEspecifica)
router.delete('/perguntas/:id', auth, perguntas_controller.deletePergunta)
router.put('/perguntas/:id', auth, perguntas_controller.putPergunta)
router.post('/perguntas/pesquisa/:pesquisa', auth, perguntas_controller.postVariasPerguntas)
router.post('/perguntas', auth, perguntas_controller.postPergunta)

module.exports = router;