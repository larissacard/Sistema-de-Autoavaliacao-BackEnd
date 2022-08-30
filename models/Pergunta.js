const cliente = require("../infra/connection");

module.exports = class Pergunta {
    constructor(enunciado, id, fk_pesquisa) {
        this.id = id;
        this.enunciado = enunciado;
        this.fk_pesquisa = fk_pesquisa;
    }
 
    static procuraPergunta(id) {
        return cliente.query(`SELECT * FROM perguntas WHERE id = $1`, [id]); 
    }
    
    static deletePergunta(id){
        return cliente.query(`DELETE FROM perguntas WHERE id = $1`, [id])
    }

    static putPergunta(pergunta, id){
        return cliente.query(`UPDATE perguntas (enunciado, fk_pesquisa, id)`, [pergunta.enunciado, pergunta.fk_pesquisa, id])
    }

    static postPergunta(pergunta) {
        return cliente.query(`INSERT INTO perguntas (enunciado, fk_pesquisa) 
                              values ($1, $2)`, [ pergunta.enunciado, pergunta.fk_pesquisa]);
    }

    static getRespostas(id){
        return cliente
                    .query(`SELECT
                            re.id as res_id, us.id as user_id, us.nome as user_name, re.nota
                            FROM respostas as re
                            INNER JOIN usuario as us ON us.id = re.fk_usuario
                            WHERE fk_pergunta = $1`, [id])
    }
}
