'use strict';
module.exports = {
  async up (queryInterface) {
    await queryInterface.sequelize.query(`
    CREATE TABLE "permissoes-tipo-usuario" (
      "fk_tipo_usuario" bigint NOT NULL,
      "fk_permissao" bigint NOT NULL
    );

    ALTER TABLE "permissoes-tipo-usuario" ADD FOREIGN KEY ("fk_tipo_usuario") REFERENCES "tipo_usuario" ("id");
    ALTER TABLE "permissoes-tipo-usuario" ADD FOREIGN KEY ("fk_permissao") REFERENCES "permissoes" ("id");
    `);
  },

  async down (queryInterface) {
    await queryInterface.dropTable('permissoes-tipo-usuario');
  }
};
