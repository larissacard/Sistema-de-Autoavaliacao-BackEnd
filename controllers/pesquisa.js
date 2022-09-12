const Pesquisa = require('../models/Pesquisa')

exports.getAll = async(req, res, next) => {
    try {
        const pesquisas = await Pesquisa.getAll()
        return res.status(200).json(pesquisas.rows)
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
        return res.status(500).json(err)
    }
}

exports.deletePesquisa = async(req, res, next) => {
    const id = req.params.id
    try {
        Pesquisa.deletePesquisa(id)
        return res.status(200).json({message: "Deletado com sucesso"})
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.putPesquisa = async(req, res, next) => {
    const id = req.params.id
    const {fk_grupo, titulo, descricao, fk_tipo_pesquisa} = req.body
    try {
        Pesquisa.putPesquisa(fk_grupo, titulo, descricao, fk_tipo_pesquisa, id )
        return res.status(200).json({message: "Atualizado"})
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.postPesquisa = async (req, res, next) => {
    // const errors = validationResult(req);

    // if (errors.isEmpty()) return
    const { titulo, descricao, fk_usuario, fk_tipo_pesquisa, fk_grupo, data_inicio, data_fim } = req.body

    try {

        const dadosPequisa = {
            titulo: titulo,
            descricao: descricao,
            fk_usuario: fk_usuario,
            fk_tipo_pesquisa: fk_tipo_pesquisa,
            fk_grupo: fk_grupo,
            data_inicio: data_inicio,
            data_fim: data_fim
        }

        const pesquisaCriada = await Pesquisa.postPesquisa(dadosPequisa);

        res.status(201).json({ message: 'Success Search Registered', id: pesquisaCriada });

    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.getOneResponse = async (req, res, next) => {
    // Retorna as respostas que um usuario especifico fez
    // em uma pesquisa

    const user = req.params.user
    const pesquisa = req.params.pesquisa

    try {
        const dados_pesquisa = await Pesquisa.procuraPesquisa(pesquisa)
        const respostas = await Pesquisa.getOneResponse(user, pesquisa)

        // Retornando um objeto de respostas
        let obj = dados_pesquisa.rows[0]
        obj.respostas = respostas.rows

        return res.status(200).json(obj)
    } catch (error) {
        return res.status(400).json(error)
    }
}