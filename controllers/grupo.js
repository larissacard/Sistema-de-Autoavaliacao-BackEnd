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
        if (grupo.rowCount === 0) return res.status(404).json({message: `Nenhum Grupo Encontrado com o ID ${id}`})
        const pessoas = await Grupo.getPessoas(id)

        // Montando um Objeto para a resposta
        let results = {}
        results = grupo.rows[0]
        results.pessoas = pessoas.rows

        console.log(res)
        return res.status(200).json(results)
    } catch (error) {
        return res.status(400).json({erro: error})
    }
}

exports.postGrupo = async(req, res, next) => {
    const {nome, status, pessoas} = req.body
    try{
        const dadosGrupo = {
            nome: nome,
            status: status
        }

        const grupoEnviado = await Grupo.postGrupo(dadosGrupo);
        console.log(grupoEnviado.rows[0].id)
        pessoas.forEach(element => {
            Grupo.postGrupoPessoa(grupoEnviado.rows[0].id, element)
        });

        res.status(201).json({message: 'Cadastrado com sucesso!', data: grupoEnviado})
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.putGrupo = async(req, res, next) => {
    const id = req.params.id
    const {nome, status} = req.body
    try {
        if (grupo.rowCount === 0) return res.status(404).json({message: `Nenhum Grupo Encontrado com o ID ${id}`})

        Grupo.putGrupo( nome, status, id )
        return res.status(200).json({message: "Atualizado"})
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deleteGrupo = async(req, res, next) => {
    const id = req.params.id
    try {
        if (grupo.rowCount === 0) return res.status(404).json({message: `Nenhum Grupo Encontrado com o ID ${id}`})
        Grupo.deleteGrupo(id)
        return res.status(200).json({message: 'deletado com sucesso!'})
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getGrupoPesquisas = async(req, res, next) => {
    const id = req.params.id
    
    try {
      const resultado = await Grupo.getGrupoPesquisas(id)
        return res.status(200).json(resultado)
    } catch (error) {
        return res.status(400).json(error)
    }
}