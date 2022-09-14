const Grupo = require('../models/grupo')
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
        if (dados_pesquisa.rowCount === 0) return res.status(404).json({message: `Nenhuma Pesquisa encontrada com o ID: ${id}`})

        const perguntas = await Pesquisa.getPerguntasPesquisa(id)
        const grupos = await Pesquisa.getGrupos(id)

        const res_obj = dados_pesquisa.rows[0]
        res_obj.perguntas = perguntas.rows
        res_obj.grupos = grupos.rows
         
        return res.status(200).json(res_obj)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deletePesquisa = async(req, res, next) => {
    const id = req.params.id
    try {
        // Verificando se a pesquisa existe antes de deletar ela
        const dados_pesquisa = await Pesquisa.procuraPesquisa(id);
        if (dados_pesquisa.rowCount === 0) return res.status(404).json({message: `Nenhuma Pesquisa encontrada com o ID: ${id}`})

        Pesquisa.deletePesquisa(id)
        return res.status(200).json({message: 'Deletado com sucesso!'})
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.putPesquisa = async(req, res, next) => {
    const id = req.params.id
    const {titulo, descricao, fk_tipo_pesquisa} = req.body
    try {
        // Verificando se a pesquisa existe antes de editar ela
        const dados_pesquisa = await Pesquisa.procuraPesquisa(id);
        if (dados_pesquisa.rowCount === 0) return res.status(404).json({message: `Nenhuma Pesquisa encontrada com o ID: ${id}`})

        Pesquisa.putPesquisa(titulo, descricao, fk_tipo_pesquisa, id)
        return res.status(200).json({message: "Atualizado"})
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.postPesquisa = async (req, res, next) => {
    const { titulo, descricao, fk_usuario, fk_tipo_pesquisa, grupos, datas_inicio, datas_fim } = req.body

    // Verificando se todos os valores foram recebidos
    if (!titulo || !descricao || !fk_usuario || !fk_tipo_pesquisa || !grupos || !datas_inicio || !datas_fim){
        return res.status(400).json({message: `Valores obrigatórios não foram fornecidos`, requisicao: req.body})
    }

    // Validando se foram recebidas as infomações corretas das datas de inicio e fim
    if (datas_inicio.length !== datas_fim.length || datas_fim.length != grupos.length){
        return res.status(400).json({message: `Cada grupo deve ter uma data de incio e de fim da pesquisa`})
    }

    try {
        const pesquisaCriada = await Pesquisa.postPesquisa({
            titulo: titulo,
            descricao: descricao,
            fk_usuario: fk_usuario,
            fk_tipo_pesquisa: fk_tipo_pesquisa,
        });
        
        const lista_grupos = await Grupo.getAll()
        lista_IdsGrupos = lista_grupos.rows.map(gr => parseInt(gr.id))

        let listaInvalidos = []
        await grupos.forEach(async (gr, index) => {
            if (!lista_IdsGrupos.includes(parseInt(gr))) listaInvalidos.push(gr)
            else await Grupo.AssociaGrupoPesquisa(pesquisaCriada.rows[0].id, gr, datas_inicio[index], datas_fim[index])
        })

        if (listaInvalidos.length > 0)
            return res.status(200).json({message: `A pesquisa foi cadastrada, porém os grupos: '${listaInvalidos.toString().replace(",", "', '")}' não foram encontrados!`})

        res.status(201).json({ message: 'Pesquisa cadastrada com sucesso!', id: pesquisaCriada });

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
        if (dados_pesquisa.rowCount === 0) return res.status(404).json({message: `Nenhuma Pesquisa encontrada com o ID: ${id}`})

        const respostas = await Pesquisa.getOneResponse(user, pesquisa)

        // Retornando um objeto de respostas
        let obj = dados_pesquisa.rows[0]
        obj.respostas = respostas.rows

        return res.status(200).json(obj)
    } catch (error) {
        return res.status(400).json(error)
    }
}