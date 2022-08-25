const Grupo = require('../models/grupo')

exports.getAll = async (req, res, next) => {
    try {
        const grupos = await Grupo.getAll()
        return res.status(200).json(grupos.rows)
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.getOne = async (req, res, next) => {
    const id = req.params.id
    try {
        const grupo = await Grupo.getOne(id)
        const pessoas = await Grupo.getPessoas(id)

        // Montando um Objeto para a resposta
        let res = grupo.rows[0]
        res.pessoas = pessoas.rows
        return res.status(200).json(res)
    } catch (error) {
        
    }
}