const cliente = require("../infra/connection");

module.exports = class Grupo {
    constructor(id, nome, status) {
        this.id = id;
        this.nome = nome;
        this.status = status;
    }

    static getAll(){
        return cliente.query(`SELECT * FROM grupo`);
    }

    static getOne(id){
        return cliente.query(`SELECT * FROM grupo WHERE id = $1`, [id]);
    }

    static getPessoas(id){
        return cliente
                    .query(`SELECT us.* FROM usuario AS us
                            INNER JOIN grupo_usuario AS gu ON gu.fk_usuario = us.id
                            INNER JOIN grupo AS gr ON gr.id = gu.fk_grupo
                            WHERE gr.id = $1`, [id]);
    }

    static getGrupoPesquisas(id){
        return cliente.query(`SELECT pe.* from pesquisa as pe
                            INNER JOIN pesquisa_grupo AS pg ON pg.fk_pesquisa = pe.id
                            INNER JOIN grupo AS gr ON gr.id = pg.fk_grupo
                            WHERE gr.id = $1`, [id])
    }

    static postGrupo(grupo){
        return cliente.query(`INSERT INTO grupo (nome, status) values ($1, $2)
                              RETURNING id`, [grupo.nome, grupo.status]);
    }

    static putGrupo(grupo, id) {
        return cliente.query(`UPDATE grupo set nome = $1, status = $2 where id = $3`, [grupo.nome, grupo.status, id]);
    }

    static deleteGrupo(id){
        return cliente.query(`DELETE FROM grupo WHERE id = $1`, [id]);
    }
    
    static postGrupoPessoa(grupo, pessoa) {
        return cliente.query(`INSERT INTO grupo_usuario (fk_grupo, fk_usuario) values ($1, $2)`, [grupo, pessoa])
    }

    static AssociaGrupoPesquisa(fk_pesquisa, fk_grupo, data_inicio, data_fim) {
        return cliente.query(`INSERT INTO pesquisa_grupo (fk_pesquisa, fk_grupo, data_inicio, data_fim)
                              values ($1, $2, $3, $4)`, [fk_pesquisa, fk_grupo, data_inicio, data_fim])
    }

    static getComPesquisa(){
        return cliente
                    .query(`SELECT * FROM grupo AS gr
                            INNER JOIN pesquisa_grupo AS pg ON pg.fk_grupo = gr.id
                            INNER JOIN pesquisa AS pe ON pe.id = pg.fk_pesquisa`)
    }

    static removePessoas(id){
        return cliente
                    .query(`DELETE FROM grupo_usuario where fk_grupo = $1`, [id])
    }

    static removePesquisa(id){
        return cliente
                    .query(`DELETE FROM pesquisa_grupo where fk_grupo = $1`, [id])
    }
}

