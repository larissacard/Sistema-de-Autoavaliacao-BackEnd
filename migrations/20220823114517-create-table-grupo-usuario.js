'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE usuario
      DROP COLUMN fk_grupo;

      CREATE TABLE grupo_usuario(
        fk_grupo BIGINT NOT NULL,
        fk_usuario BIGINT NOT NULL
      );

      ALTER TABLE "grupo_usuario" ADD FOREIGN KEY ("fk_usuario") REFERENCES "usuario" ("id");
    
      ALTER TABLE "grupo_usuario" ADD FOREIGN KEY ("fk_grupo") REFERENCES "grupo" ("id");
    `);
  },

  async down (queryInterface) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS grupo_usuario;

      ALTER TABLE usuario
      ADD COLUMN fk_grupo BIGINT;

      ALTER TABLE "usuario" ADD FOREIGN KEY ("fk_grupo") REFERENCES "grupo" ("id");
    `);
  }
};
