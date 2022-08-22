const Pesquisa = require('../models/Pesquisa')

exports.pesquisa = async(req, res, next) => {
    const id = req.params.id

    try {
        const dados_pesquisa = await Pesquisa.procuraPesquisa(id);
        const perguntas = await Pesquisa.procuraPerg(id)
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