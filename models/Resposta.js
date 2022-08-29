const cliente = require("../infra/connection");

module.exports = class Resposta {
    constructor(id, fk_usuario, fk_pergunta, nota, create_at) {
        this.id = id;
        this.fk_usuario = fk_usuario;
        this.fk_pergunta = fk_pergunta;
        this.nota = nota;
    }

    static getAll(){
        return cliente.query(`SELECT * FROM respostas ORDER BY id`);
    }

    static getResposta(id){
        return cliente.query(`SELECT * FROM respostas WHERE id= $1`, [id]);
    }

    static postResposta(resposta) {
        return cliente.query(`INSERT INTO respostas (fk_usuario, fk_pergunta, nota) values ($1, $2, $3)`, [resposta.fk_usuario, resposta.fk_pergunta, resposta.nota]);
    }
}   