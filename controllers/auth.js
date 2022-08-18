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
        if (tipo == 1){
            const error = new Error('Deus Já Existe!');
            error.statusCode = 400;
            throw error;
        }
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
    const cpf = req.body.cpf;
    const senha = req.body.senha;

    try {

        const user = await Root.procurarRoot(cpf);

        // if (user.tipo == 3) {
        //     res.status(200).json({message: "Login Finalizado"})
        // }
        // else {
        //     res.status(200).json({message: "Insira a senha para concluir o login"})
        // }
        

        if(user.rows.length !== 1){
            const error = new Error('CPF não encontrado!');
            error.statusCode = 401;
            throw error;
        }

        const guardaUser = user.rows[0];

        const confirmaSenha = await bcrypt.compare(senha, guardaUser.senha);

        if(!confirmaSenha){
            const error = new Error('Senha incorreta!');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign(
            {
                cpf: guardaUser.cpf,
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