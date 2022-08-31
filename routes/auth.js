const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const Root = require('../models/Root');

const authController = require('../controllers/auth');


router.post('/cadastrar',
        body('nome').trim().not().isEmpty(),
        body('email').isEmail().withMessage('Email Inválido').normalizeEmail(),
        body('senha').trim().isLength({ min: 7 }),
        body('cpf').trim().isLength({ min: 11, max: 11 })
    , authController.cadastrar
)

router.post('/login', authController.login)

module.exports = router;