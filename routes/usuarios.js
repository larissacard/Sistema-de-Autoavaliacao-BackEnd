const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const usuario_controller = require('../controllers/usuario')
const multerConfig = require('../middleware/multer')
const multer = require("multer");

router.get('/usuarios', auth, usuario_controller.getAll)
router.get('/usuarios/:id/pesquisas', auth, usuario_controller.getPesquisas)
router.delete('/usuarios/:id', auth, usuario_controller.deleteUsuario)
router.put('/usuarios/:id', auth, multer(multerConfig).single('foto'), usuario_controller.updateUsuario)

module.exports = router;