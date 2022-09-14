const Pergunta = require('../models/Pergunta');
const Pesquisa = require('../models/Pesquisa');

exports.perguntaEspecifica = async(req, res, next) => {
    const id = req.params.id
    try {
        const dados_pergunta = await Pergunta.procuraPergunta(id);
        if (dados_pergunta.rowCount === 0) return res.status(404).json({message: `Nenhuma Pergunta Encontrada com o ID ${id}`})
        const respostas = await Pergunta.getRespostas(id)

        // Montando um objeto para resposta
        let obj = dados_pergunta.rows[0]
        obj.respostas = respostas.rows
        return res.status(200).json(obj)
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.deletePergunta = async(req, res, next) => {
    const id = req.params.id
    try {
        const dados_pergunta = await Pergunta.procuraPergunta(id);
        if (dados_pergunta.rowCount === 0) return res.status(404).json({message: `Nenhuma Pergunta Encontrada com o ID ${id}`})
        
        Pergunta.deletePergunta(id)
        return res.status(200).json({message: 'Deletado com sucesso!'})
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.putPergunta = async(req, res, next) => {
    const id = req.params.id
    const {enunciado, fk_pesquisa} = req.body
    try {
        const dados_pergunta = await Pergunta.procuraPergunta(id);
        if (dados_pergunta.rowCount === 0) return res.status(404).json({message: `Nenhuma Pergunta Encontrada com o ID ${id}`})

        Pergunta.putPergunta( enunciado, fk_pesquisa, id )
        return res.status(200).json({message: "Atualizado!"})
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.postPergunta = async (req, res, next) => {
    const { enunciado, fk_pesquisa } = req.body

    try {
        const dadosPergunta = {
            enunciado: enunciado,
            fk_pesquisa: fk_pesquisa
        }

        const perguntaCriada = await Pergunta.postPergunta(dadosPergunta);
        console.log(perguntaCriada)
        res.status(201).json({ message: 'Pergunta cadastrada com sucesso!' });
    } catch (err) {
        return res.status(500).json(err)
    }
}

exports.postVariasPerguntas = async (req, res, next) => {
    const { perguntas } = req.body
    const { pesquisa } = req.params

    console.log(perguntas)
    try {
        await perguntas.forEach((perg) => {
            Pergunta.postPergunta({enunciado: perg.enunciado, fk_pesquisa: pesquisa});
        })

        res.status(201).json({ message: 'Perguntas cadastradas com sucesso!' });
    } catch (err) {
        console.log(`Erro: ${err}`)
        return res.status(500).json(err)
    }
}