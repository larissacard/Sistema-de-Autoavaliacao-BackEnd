const express = require('express');

const { body } = require('express-validator')

const router = express.Router();

const Root = require('../models/Root');

const authController = require('../controllers/auth')


router.post('/cadastrar',
    [
        body('nome').trim().isEmpty(),
        body('email').isEmail().withMessage('Please enter a valid email.').custom(async (email)=>{
            const user = await User.find(email);
            if(user[0].length > 0){
                return Promise.reject('Email address already exist!')
            }
        }).normalizeEmail(),
        body('senha').trim().isLength({ min: 7 }),
        body('tipo').trim().isEmpty(),
        body('cpf').trim().isLength({ min: 11, max: 11 }),
        body('foto').trim().isEmpty()
    ], authController.cadastrar
)

module.exports = router