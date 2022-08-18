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