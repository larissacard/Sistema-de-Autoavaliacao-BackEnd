const express = require('express');

const { body, validationResult } = require('express-validator');

const router = express.Router();

const Root = require('../models/Root');

const authController = require('../controllers/auth');


router.post('/cadastrar',
        body('nome').not().isEmpty().trim(),
        body('email').isEmail().withMessage('Email Inválido').custom(async (email)=>{
            const user = await Root.procurarRoot(email);
            if(user.length > 0){
                return Promise.reject('Email já existe!')
            }
        }).normalizeEmail(),
        body('senha').trim().isLength({ min: 7 }),
        body('tipo').not().trim().isEmpty(),
        body('cpf').trim().isLength({ min: 11 }),
        body('foto').not().trim().isEmpty()
    , (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
    },
    authController.cadastrar
)

router.post('/login', authController.login)

module.exports = router;