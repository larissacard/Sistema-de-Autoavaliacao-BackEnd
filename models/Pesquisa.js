const cliente = require("../server/infra/connection");

cliente.connect();

module.exports = class Pesquisa {
    constructor(descricao, titulo) {
        this.titulo = titulo;
        this.descricao = descricao;
    }

    static procuraPesquisa(titulo) {
        return cliente.query("SELECT * FROM pesquisa WHERE titulo = $1");
    }
}

