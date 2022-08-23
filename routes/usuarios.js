const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const usuario_controller = require('../controllers/usuario')

router.get('/usuarios', auth, usuario_controller.getAll)

module.exports = router;