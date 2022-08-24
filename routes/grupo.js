const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth')
const grupo_controller = require('../controllers/grupo')

router.get('/grupos', auth, grupo_controller.getAll)

module.exports = router;