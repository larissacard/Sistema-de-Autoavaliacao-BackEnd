
const Resposta = require('../models/Resposta')

exports.getAll =  async(req, res, next) => {
    try {
        const resposta = await Resposta.getAll()
        return res.status(200).json(resposta.rows)
    } catch(error){
        return res.status(400).json(error)
    }
}

exports.getResposta = async(req, res, next) => {
    const id = req.params.id

    try {
        const dados_resposta = await Resposta.getResposta(id);
        const perguntas = await Resposta.getRespostaPergunta(id);
        const res_obj = resposta.rows
        return res.status(200).json(res_obj)
    } catch(error){
        return res.status(400).json(error)
    }
}

exports.postResposta = async(req, res, next) => {
    const {fk_usuario, fk_pergunta, nota} = req.body

    try {
        const dadosResposta = {
            fk_usuario: fk_usuario,
            fk_pergunta: fk_pergunta,
            nota: nota
        }

        const respostaEnviada =  await Resposta.postResposta(dadosResposta);

        res.status(201).json({message: 'Resposta registrada'})
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    }
}