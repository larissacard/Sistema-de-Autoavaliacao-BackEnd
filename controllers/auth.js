const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Root = require('../models/Root');
const { s3Uploadv2 } = require("../middleware/s3Service");

exports.cadastrar = async (req, res, next) => {
    const nome = req.body.nome;
    const tipo = req.body.tipo;
    const email = req.body.email;
    const senha = req.body.senha;
    const cpf = req.body.cpf;
    const foto = req.body.foto;

    try {
        if (tipo == 1) {
            const error = new Error('Deus Já Existe!');
            error.statusCode = 400;
            throw error;
        }

        if (tipo !== 3 && !senha) {
            return res.status(400).json({ message: "Insira uma Senha" })
        }

        if (tipo !== 3 && senha.length < 8) {
            return res.status(400).json({menssage : "Senha tem que ter no min 7 caracteres"})
        }

        const qtd_emails = await Root.procurarRootEmail(email)
        if (qtd_emails.rowCount > 0) {
            return res.status(400).json({ message: "Email já cadastrado" })
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

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }
        
        // Verificando se um arquivo de foto foi recebido
        if (req.file){
            var result = await s3Uploadv2(req.file)
            detalhesUsuario.foto = result.Location
        } 

        try {
            await Root.adicionaRoot(detalhesUsuario);
        } catch (error) {
            return res.status(400).json(error)
        }


        res.status(201).json({ message: 'Success Registered' });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}


exports.login = async (req, res, next) => {
    const cpf = req.body.cpf;
    const senha = req.body.senha;

    const user = await Root.procurarRoot(cpf);
    const guardaUser = user.rows[0];

    if (user.rows.length !== 1) {
        return res.status(404).json({ message: `Usuário não encontrado` })
    }

    if (user.rows[0].tipo == 3) {
        const token = jwt.sign(
            {
                userId: guardaUser.id,
                nome: guardaUser.nome,
                tipo: guardaUser.tipo,
                foto: guardaUser.foto
            },
            process.env.SECRET,
            { expiresIn: '2h' }
        );
        return res.status(200).json({ message: "Login Finalizado", token: token, userId: guardaUser.id, tipo: 3, nome: guardaUser.nome, foto: guardaUser.foto })

    } else {

        if (!senha) {
            return res.status(401).json({ message: "Insira uma Senha" })
        }

        const confirmaSenha = await bcrypt.compare(senha, guardaUser.senha);

        if (!confirmaSenha) {
            return res.status(400).json({ message: `Senha Incorreta` })
        }

        const token = jwt.sign(
            {
                userId: guardaUser.id,
                nome: guardaUser.nome,
                tipo: guardaUser.tipo,
                foto: guardaUser.foto
            },
            process.env.SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({ token: token, userId: guardaUser.id, tipo: guardaUser.tipo, nome: guardaUser.nome, foto: guardaUser.foto})
    }
}