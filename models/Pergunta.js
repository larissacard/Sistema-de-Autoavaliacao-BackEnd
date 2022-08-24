const cliente = require("../infra/connection");

module.exports = class Pergunta {
    constructor(enunciado, id, fk_pesquisa) {
        this.id = id;
        this.enunciado = enunciado;
        this.fk_pesquisa = fk_pesquisa;
    }

    //static getAll(){
    //    return cliente.query("SELECT * from perguntas ORDER BY id")
    //}
 
    static procuraPergunta(id) {
        return cliente.query("SELECT * FROM perguntas WHERE id = $1", [id]); 
    }
    
    static deletePergunta(id){
        return cliente.query(`DELETE FROM perguntas WHERE id = $1`, [id])
    }

    static putPergunta(enunciado, fk_pesquisa, id){
        return cliente.query(`UPDATE pergunta set enunciado = $1, fk_pesquisa = $2 WHERE id = $3`, [enunciado, fk_pesquisa, id])
    }

    static postPergunta(pergunta) {
        return cliente.query('INSERT INTO pergunta (enunciado, fk_pesquisa) values ($1, $2)', [ pergunta.enunciado, pergunta.fk_pesquisa]);
    }
}
