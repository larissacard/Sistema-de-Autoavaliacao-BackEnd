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
                    .query(`SELECT pe.* FROM usuario AS us
                            INNER JOIN grupo_usuario AS gu ON gu.fk_usuario = us.id
                            INNER JOIN grupo AS gr ON gr.id = gu.fk_grupo
                            INNER JOIN pesquisa AS pe ON pe.fk_grupo = gr.id
                            WHERE us.id = $1`, [id])
    }

    static deleteUsuario(id) {
        return cliente
                    .query(`DELETE FROM usuario
                            WHERE id = $1`, [id])
    }

    static updateUsuario(usuario, id) {
        return cliente
                    .query(`UPDATE usuario set tipo = $1, set nome = $2, set email = $3, set senha = $4, set cpf = $5 WHERE id = $6`, [
                    usuario.tipo, usuario.nome, usuario.email,
                    usuario.senha, usuario.cpf, id ])
    }
}

