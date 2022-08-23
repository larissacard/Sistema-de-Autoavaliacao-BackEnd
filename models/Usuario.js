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
}

