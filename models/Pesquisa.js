const { pesquisaEspecifica } = require("../controllers/pesquisa");
const cliente = require("../infra/connection");

module.exports = class Pesquisa {
    constructor(descricao, titulo, id, fk_grupo, fk_tipo_pesquisa) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.fk_grupo = fk_grupo;
        this.fk_tipo_pesquisa = fk_tipo_pesquisa;

    }

    static getAll(){
        return cliente.query("SELECT * from pesquisa ORDER BY id")
    }
 
    static procuraPesquisa(id) {
        return cliente.query("SELECT * FROM pesquisa WHERE id = $1", [id]); 
    }
    
    static getPerguntasPesquisa(id) {
        return cliente.query(`SELECT * FROM perguntas WHERE fk_pesquisa = $1`, [id])
    }

    static deletePesquisa(id){
        return cliente.query(`DELETE FROM pesquisa WHERE id = $1`, [id])
    }

    static putPesquisa(fk_grupo, titulo, descricao, fk_tipo_pesquisa, id){
        return cliente.query(`UPDATE pesquisa set fk_grupo = $1, titulo = $2, descricao = $3, fk_tipo_pesquisa = $4 WHERE id = $5`, [fk_grupo, titulo, descricao, fk_tipo_pesquisa, id])
    }
}

