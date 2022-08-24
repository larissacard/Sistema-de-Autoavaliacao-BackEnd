const cliente = require("../infra/connection");

module.exports = class Grupo {
    constructor(id, nome, status) {
        this.id = id;
        this.nome = nome;
        this.status = status;
    }

    static getAll(){
        return cliente.query(`SELECT * FROM grupo`)
    }

    static getOne(id){
        return cliente.query(`SELECT * FROM grupo WHERE id = $1`, [id])
    }

    static getPessoas(id){
        return cliente.query(`SELECT * FROM grupo WHERE id = $1`, [id])
    }
}

