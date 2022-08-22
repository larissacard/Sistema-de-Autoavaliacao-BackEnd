const cliente = require("../server/infra/connection");

module.exports = class Pesquisa {
    constructor(descricao, titulo, id) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
    }
 
    static async procuraPesquisa(id) {
        const res = await cliente.query("SELECT * FROM pesquisa WHERE id = $1", [id]);

        const perguntas = await cliente
                                    .query(`SELECT * FROM perguntas AS perg ON perg.fk_pesquisa = pe.id
                                            WHERE pe.id = 7`)
                                    .catch(e => {
                                        return res.status(400).json(e)
                                    })
        
        const res_obj = res.rows[0]
        res_obj.perguntas = perguntas.rows

        return res.status(200).json(res_obj)
    }

    // static adicionaPesquisa(){
    //     for(let j in colaboradores) {
    //         await pool.query(`insert into colaboradores(id_equipe, nome_colaborado, atribuicao)
    //             values($1, $2, $3)`, [colaboradores[j].id_equipe, colaboradores[j].nome_colaborado, colaboradores[j].atribuicao]);
    //     }
    // }
}

