const Pesquisa = require('../models/Pesquisa')

exports.getAll = async(req, res, next) => {
    try {
        Pesquisa.getAll()
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.pesquisaEspecifica = async(req, res, next) => {
    const id = req.params.id

    try {
        const dados_pesquisa = await Pesquisa.procuraPesquisa(id);
        const perguntas = await Pesquisa.getPerguntasPesquisa(id)
        const res_obj = dados_pesquisa.rows[0]
        res_obj.perguntas = perguntas.rows
        return res.status(200).json(res_obj)
    } catch (err) {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err)
    }
}

exports.deletePesquisa = async(req, res, next) => {
    const id = req.params.id
    try {
        Pesquisa.deletePesquisa(id)
    } catch (err) {
        return res.status(500).json(err)
    }
}