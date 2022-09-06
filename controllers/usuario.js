const Usuario = require('../models/Usuario')

exports.getAll = async(req, res, next) => {
    try {
        const usuarios = await Usuario.getAll()
        return res.status(200).json(usuarios.rows)
    } catch (error) {
        return res.status(400).json(error)
    }
}

//Pedroca migulo não mostra se o usuario ja tiver respondido a pesquisa
exports.getPesquisas = async(req, res, next) => {
    const id = req.params.id

    try {
        let pesquisas = await Usuario.getPesquisas(id)
        let respondidas = await Usuario.getPesquisasRes(id)
        respondidas.rows.map(p => p.fk_pesquisa)

        const resultado = pesquisas.rows.filter(pe => !respondidas.rows.includes(pe.id))
        return res.status(200).json(resultado)
    } catch (error) {
        const usuario = await Usuario.getOne(id)
        if (usuario.rowCount === 0) {
            return res.status(404).json({message: `Usuario ${id} não encontrado`})
        }
        return res.status(400).json(error)
    }
}

exports.deleteUsuario = async(req, res, next) => {
    const id = req.params.id

    try {
        const usuario = await Usuario.deleteUsuario(id)
        return res.status(200).json(usuario.rows)
    } catch (error) {
        const usuario = await Usuario.getOne(id)
        if (usuario.rowCount !== 0) {
            return res.status(404).json({message: `Usuario ${id} não encontrado`})
        }
        return res.status(400).json(error)
    }
}

exports.updateUsuario = async(req, res, next) => {
    const id = req.params.id
    const {tipo, nome, email, senha, cpf} = req.body

    if(tipo != '1' && tipo != '2' && tipo != '3'){
        return res.status(400).json({message: "Tipo de usuário invalido!"})
    }
    try {
        Usuario.updateUsuario(tipo, nome, email, senha, cpf, id)
        return res.status(200).json({message: "Usuário atualizado com sucesso!!"})

    } catch (error) {
        return res.status(500).json(error)
    }
}