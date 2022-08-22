const cliente = require("../server/infra/connection");

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

    // static adicionaPesquisa(){
    //     for(let j in colaboradores) {
    //         await pool.query(`insert into colaboradores(id_equipe, nome_colaborado, atribuicao)
    //             values($1, $2, $3)`, [colaboradores[j].id_equipe, colaboradores[j].nome_colaborado, colaboradores[j].atribuicao]);
    //     }
    // }
}

