const cliente = require("../infra/connection");

module.exports = class Pesquisa {
    constructor(descricao, titulo, id) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
    }
 
    static procuraPesquisa(id) {
        return cliente.query("SELECT * FROM pesquisa WHERE id = $1", [id]); 
    }
    
    static procuraPerg(id) {
        return cliente.query(`SELECT * FROM perguntas WHERE fk_pesquisa = $1`, [id])
    }

    static deletePesquisa(id){
        return cliente.query(`DELETE FROM pesquisa WHERE id = $1`, [id])
    }
}

