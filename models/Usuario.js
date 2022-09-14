const cliente = require("../infra/connection");

module.exports = class Usuario {
    constructor(id, tipo, nome, email, senha, cpf, foto, fk_grupo) {
        this.id = id;
        this.tipo = tipo;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.foto = foto;
        this.fk_grupo = fk_grupo;
    }

    static getAll(){
        return cliente.query("SELECT * from usuario ORDER BY id")
    }

    static getOne(id){
        return cliente.query("SELECT * from usuario WHERE id = $1", [id])
    }

    static getPesquisas(id){
        return cliente
                    .query(`SELECT pe.* from pesquisa as pe
                            INNER JOIN pesquisa_grupo AS pg ON pg.fk_pesquisa = pe.id
                            INNER JOIN grupo AS gr ON gr.id = pg.fk_grupo
                            INNER JOIN grupo_usuario AS gu ON gu.fk_grupo = gr.id
                            INNER JOIN usuario AS us ON us.id = gu.fk_usuario
                            WHERE us.id = $1`, [id])
    }

    static getPesquisasRes(id){
        return cliente
                    .query(`SELECT fk_pesquisa FROM respostas AS re
                            INNER JOIN perguntas AS pe ON pe.id = re.fk_pergunta
                            WHERE re.fk_usuario = $1
                            group by fk_pesquisa`, [id])
                            
    }

    static deleteUsuario(id) {
        return cliente
                    .query(`DELETE FROM usuario
                            WHERE id = $1`, [id])
    }

    static updateUsuario(tipo, nome, email, cpf, id) {
        return cliente
                    .query(`UPDATE usuario set tipo = $1, nome = $2, email = $3, cpf = $4 WHERE id = $5`, [
                    tipo, nome, email, cpf, id ])
    }

    
}

