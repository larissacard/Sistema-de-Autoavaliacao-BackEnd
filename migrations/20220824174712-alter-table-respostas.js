'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE respostas DROP COLUMN fk_pergunta;

      ALTER TABLE respostas ADD COLUMN fk_pergunta bigint;

      ALTER TABLE respostas ADD CONSTRAINT id_pergunta_fk
      FOREIGN KEY (fk_pergunta) REFERENCES perguntas(id) ON DELETE CASCADE;
    `)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE respostas DROP CONSTRAINT id_pergunta_fk;

      ALTER TABLE "respostas" ADD FOREIGN KEY ("fk_pergunta") REFERENCES "perguntas" ("id");
  `)
  }
};
