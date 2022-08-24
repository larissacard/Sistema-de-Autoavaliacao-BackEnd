const Pergunta = require('../models/Pergunta')
const validationResult = require('express-validator')

exports.perguntaEspecifica = async(req, res, next) => {
    const id = req.params.id
    try {
        const dados_pergunta = await Pergunta.procuraPergunta(id);
        return res.status(200).json(dados_pergunta.rows)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deletePergunta = async(req, res, next) => {
    const id = req.params.id
    try {
        Pergunta.deletePergunta(id)
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.putPergunta = async(req, res, next) => {
    const id = req.params.id
    const body = req.body
    try {
        Pergunta.putPergunta( body.enunciado, body.fk_pesquisa, id )
        return res.status(200).json({message: "Atualizado"})
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.postPergunta = async (req, res, next) => {
    // const errors = validationResult(req);

    // if (errors.isEmpty()) return
    const { enunciado, fk_pesquisa } = req.body

    try {

        const dadosPergunta = {
            enunciado: enunciado,
            fk_pesquisa: fk_pesquisa
        }

        const perguntaCriada = await Pergunta.postPergunta(dadosPergunta);
        res.status(201).json({ message: 'Success Search Registered' });
    } catch (err) {
        return res.status(500).json(err)
    }
}