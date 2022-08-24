const Usuario = require('../models/Usuario')

exports.getAll = async(req, res, next) => {
    try {
        const usuarios = await Usuario.getAll()
        return res.status(200).json(usuarios.rows)
    } catch (error) {
        return res.status(400).json(error)
    }
}

exports.getPesquisas = async(req, res, next) => {
    const id = req.params.id

    try {
        const pesquisas = await Usuario.getPesquisas(id)
        return res.status(200).json(pesquisas.rows)
    } catch (error) {
        return res.status(400).json(err)
    }
}