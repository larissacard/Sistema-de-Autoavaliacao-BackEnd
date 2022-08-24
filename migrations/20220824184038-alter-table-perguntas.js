'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE perguntas DROP COLUMN fk_pesquisa;

      ALTER TABLE perguntas ADD COLUMN fk_pesquisa bigint;

      ALTER TABLE perguntas ADD CONSTRAINT id_pesquisa_fk
      FOREIGN KEY (fk_pesquisa) REFERENCES pesquisa(id) ON DELETE CASCADE;
    `)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE pergutnas DROP CONSTRAINT id_pesquisa_fk;

      ALTER TABLE "respostas" ADD FOREIGN KEY ("fk_pesquisa") REFERENCES "perguntas" ("id");
  `)
  }
};
