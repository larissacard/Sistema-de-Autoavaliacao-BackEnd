const cliente = require("../server/infra/connection");

cliente.connect()

module.exports = class Root { 
    constructor(tipo, nome, email, senha, cpf, foto){
        this.nome = nome;
        this.tipo = tipo;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.foto = foto;
    }

    static procurarRoot(email){
        return cliente.query("SELECT * from public.usuario WHERE email = $1", [email]);
    }

    static adicionaRoot(root){
        return cliente.query("INSERT INTO public.usuario (nome, tipo, email, senha, cpf, foto) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [root.nome, root.tipo, root.email, root.senha, root.cpf, root.foto]);
    }
}