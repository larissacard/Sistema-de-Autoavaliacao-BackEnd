const cliente = require("../infra/connection");

module.exports = class Pesquisa {
    constructor(descricao, titulo, id, fk_tipo_pesquisa) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.fk_tipo_pesquisa = fk_tipo_pesquisa;
        this.fk_usuario = fk_usuario;
    }

    static getAll(){
        return cliente.query(`SELECT * from pesquisa ORDER BY id`);
    }
 
    static procuraPesquisa(id) {
        return cliente.query(`SELECT * FROM pesquisa WHERE id = $1`, [id]); 
    }
    
    static getPerguntasPesquisa(id) {
        return cliente.query(`SELECT * FROM perguntas WHERE fk_pesquisa = $1`, [id])
    }

    static deletePesquisa(id){
        return cliente.query(`DELETE FROM pesquisa WHERE id = $1`, [id]);
    }

    static postPesquisa(pesquisa) {
        return cliente.query(`INSERT INTO pesquisa (titulo, descricao, fk_tipo_pesquisa, fk_usuario)
                              values ($1, $2, $3, $4) returning id`,
                              [pesquisa.titulo, pesquisa.descricao, pesquisa.fk_tipo_pesquisa, pesquisa.fk_usuario]);
    }

    static putPesquisa(titulo, descricao, fk_tipo_pesquisa, id){
        return cliente.query(`UPDATE pesquisa
                              set titulo = $1, descricao = $2, fk_tipo_pesquisa = $3
                              where id = $4`, [titulo, descricao, fk_tipo_pesquisa, id])
    }

    static putTituloDesc(titulo, descricao){
        return cliente.query(`UPDATE pesquisa
                              set titulo = $1, descricao = $2
                              where id = $3`, [titulo, descricao, id])
    }


    static getOneResponse(user, pesquisa){
        // Retorna as respostas que um usuario deu para uma pesquisa
        return cliente
                    .query(`SELECT 
                            res.id as res_id, perg.enunciado, res.nota, us.id AS user_id, us.nome AS user_nome
                            FROM respostas AS res
                            INNER JOIN perguntas AS perg ON perg.id = res.fk_pergunta
                            INNER JOIN pesquisa AS pesq ON pesq.id = perg.fk_pesquisa
                            INNER JOIN usuario AS us ON us.id = res.fk_usuario
                            WHERE pesq.id = $1 and us.id = $2`, [pesquisa, user]);
    }

    static getGrupos(pesquisa){
        return cliente.query(`SELECT gr.* FROM pesquisa AS pe
                              INNER JOIN pesquisa_grupo AS pg ON pg.fk_pesquisa = pe.id
                              INNER JOIN grupo AS gr ON gr.id = pg.fk_grupo
                              WHERE pe.id = $1`, [pesquisa])
    }
}

