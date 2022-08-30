const TipoPesquisa = require('../models/tipoPesquisa')

exports.getAll = async(req, res, next) => {
    try {
        const tipoPesquisas = await TipoPesquisa.getAll()
        return res.status(200).json(tipoPesquisas.rows)
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.tipoPesquisaEspecifica = async(req, res, next) => {
    const id = req.params.id
    try {
        const dados_tipoPesquisa = await TipoPesquisa.procuraTipoPesquisa(id);
        const res_obj = dados_tipoPesquisa.rows[0]
        return res.status(200).json(res_obj)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deleteTipoPesquisa = async(req, res, next) => {
    const id = req.params.id
    try {
        TipoPesquisa.deleteTipoPesquisa(id)
        return res.status(200)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.putTipoPesquisa = async(req, res, next) => {
    const id = req.params.id
    const body = req.body
    try {
        TipoPesquisa.putTipoPesquisa(body.nome, id )
        return res.status(200).json({message: "Atualizado"})
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.postTipoPesquisa = async (req, res, next) => {
    // const errors = validationResult(req);

    // if (errors.isEmpty()) return
    const { nome } = req.body
    try {
        const dadosTipoPequisa = {
            nome: nome
        }
        const tipoPesquisaCriada = await TipoPesquisa.postTipoPesquisa(dadosTipoPequisa);
        res.status(201).json({ message: 'Success Search Registered' });
    } catch (err) {
        return res.status(500).json(err)
    }
}