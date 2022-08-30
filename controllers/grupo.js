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
        console.log(grupo.rows)
        const pessoas = await Grupo.getPessoas(id)
        console.log(pessoas.rows)

        // Montando um Objeto para a resposta
        let res = grupo.rows[0]
        res.pessoas = pessoas.rows
        return res.status(200).json(res)
    } catch (error) {
        return res.status(400).json({erro: error})
    }
}

exports.postGrupo = async(req, res, next) => {
    const {nome, status} = req.body
    try{
        const dadosGrupo = {
            nome: nome,
            status: status
        }

        const grupoEnviado = await Grupo.postGrupo(dadosGrupo);

        res.status(201).json(grupoEnviado)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.putGrupo = async(req, res, next) => {
    const id = req.params.id
    const {nome, status} = req.body
    try {
        Grupo.putGrupo( nome, status, id )
        return res.status(200).json({message: "Atualizado"})
    } catch (err) {
        return res.status(500).json(err)
    }
}