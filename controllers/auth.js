const { validationResult } = require('express-validator');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const Root = require('../models/Root');

exports.cadastrar = async(req, res, next) => {
    const errors = validationResult(req);

    if(errors.isEmpty()) return

    const nome = req.body.nome;
    const tipo = req.body.tipo;
    const email = req.body.email;
    const senha = req.body.senha;
    const cpf = req.body.cpf;
    const foto = req.body.foto;

    try {

        const criptografaSenha = await bcrypt.hash(senha, 12);

        const detalhesUsuario = {
            nome: nome,
            tipo: tipo,
            email: email,
            senha: criptografaSenha,
            cpf: cpf,
            foto: foto
        }

       const usuarioCriado = await Root.adicionaRoot(detalhesUsuario);

       res.status(201).json({ message: 'Success Registered' });
        
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}


exports.login = async(req,res,next) => {
    const email = req.body.email;
    const senha = req.body.senha;

    try {

        const user = Root.procurarRoot(email);

        if(user.rows.length !== 1){
            const error = new Error('Email não encontrado!');
            error.statusCode = 401;
            throw error;
        }

        const guardaUser = user.rows[0];

        const confirmaSenha = await bcrypt.compare(senha, guardaUser);

        if(!confirmaSenha){
            const error = new Error('Senha incorreta!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                email: guardaUser.email,
                userId: guardaUser.id
            },
            'secretfortoken',
            { expiresIn: '2h' }
        );

        res.status(200).json({ token: token, userId: guardaUser.id })
        
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}