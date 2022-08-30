const cliente = require("../infra/connection"); 

module.exports = class TipoPesquisa {
    constructor(nome, id) {
        this.id = id;
        this.nome = nome;
    }

    static getAll(){
        return cliente.query("SELECT * from tipo_pesquisa ORDER BY id");
    }
 
    static procuraTipoPesquisa(id) {
        return cliente.query("SELECT * FROM tipo_pesquisa WHERE id = $1", [id]); 
    }

    static deleteTipoPesquisa(id){
        return cliente.query(`DELETE FROM tipo_pesquisa WHERE id = $1`, [id]);
    }

    static putTipoPesquisa(nome, id){
        return cliente.query(`UPDATE tipo_pesquisa set nome = $1,
                            WHERE id = $2`, [nome, id])
    }
    static postTipoPesquisa(pesquisa) {
        return cliente.query('INSERT INTO tipo_pesquisa (nome) values ($1)', [pesquisa.nome]);
    }
}