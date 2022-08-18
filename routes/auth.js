const express = require('express');

const { body } = require('express-validator');

const router = express.Router();

const Root = require('../models/Root');

const authController = require('../controllers/auth');


router.post('/cadastrar',
    [
        body('nome').trim().isEmpty(),
        body('email').isEmail().withMessage('Email Inválido').custom(async (email)=>{
            const user = await Root.find(email);
            if(user[0].length > 0){
                return Promise.reject('Email já existe!')
            }
        }).normalizeEmail(),
        body('senha').trim().isLength({ min: 7 }),
        body('tipo').trim().isEmpty(),
        body('cpf').trim().isLength({ min: 11, max: 11 }),
        body('foto').trim().isEmpty()
    ], authController.cadastrar
)

module.exports = router;