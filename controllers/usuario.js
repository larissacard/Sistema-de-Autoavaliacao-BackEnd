const Usuario = require('../models/Usuario')
const { s3Uploadv2 } = require("../middleware/s3Service");

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
        let pesquisas = await Usuario.getPesquisas(id)
        let respondidas = await Usuario.getPesquisasRes(id)
        respondidas = respondidas.rows.map(p => p.fk_pesquisa)
        const resultado = pesquisas.rows.filter(pe => !respondidas.includes(pe.id))
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
    const {nome, email, cpf} = req.body

    console.log(req.body)
    try {
        const user = await Usuario.getOne(id)
        console.log(user)
        let foto = user.rows[0].foto
        
        if (req.file){
            var result = await s3Uploadv2(req.file)
            foto = result.Location
        }

        try {
            Usuario.updateUsuario(nome, email, cpf, id, foto)
        } catch (error) {
            throw new Error(error)
        }
        return res.status(200).json({message: "Usuário atualizado com sucesso!!"})

    } catch (error) {
        return res.status(500).json(error)
    }
}