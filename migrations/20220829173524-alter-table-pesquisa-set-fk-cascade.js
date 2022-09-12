'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.sequelize.query(`
   ALTER TABLE pesquisa DROP COLUMN fk_tipo_pesquisa;
   ALTER TABLE pesquisa DROP COLUMN fk_usuario;
   ALTER TABLE pesquisa DROP COLUMN fk_grupo;

   ALTER TABLE pesquisa ADD COLUMN fk_tipo_pesquisa bigint;
   ALTER TABLE pesquisa ADD COLUMN fk_usuario bigint;
   ALTER TABLE pesquisa ADD COLUMN fk_grupo bigint;

   ALTER TABLE pesquisa ADD CONSTRAINT id_tipo_pesquisa_fk
   FOREIGN KEY (fk_tipo_pesquisa) REFERENCES tipo_pesquisa(id) ON DELETE CASCADE;
   ALTER TABLE pesquisa ADD CONSTRAINT id_usuario_fk
   FOREIGN KEY (fk_usuario) REFERENCES usuario(id) ON DELETE CASCADE;
   ALTER TABLE pesquisa ADD CONSTRAINT id_grupo_fk
   FOREIGN KEY (fk_grupo) REFERENCES grupo(id) ON DELETE CASCADE;
   `)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    ALTER TABLE pesquisa DROP COLUMN fk_tipo_pesquisa;
    ALTER TABLE pesquisa DROP COLUMN fk_usuario;
    ALTER TABLE pesquisa DROP COLUMN fk_grupo;
 
    ALTER TABLE pesquisa ADD COLUMN fk_tipo_pesquisa bigint;
    ALTER TABLE pesquisa ADD COLUMN fk_usuario bigint;
    ALTER TABLE pesquisa ADD COLUMN fk_grupo bigint;

    ALTER TABLE "pesquisa" ADD FOREIGN KEY ("fk_tipo_pesquisa") REFERENCES "tipo_pesquisa" ("id");
    ALTER TABLE "pesquisa" ADD FOREIGN KEY ("fk_usuario") REFERENCES "usuario" ("id");
    ALTER TABLE "pesquisa" ADD FOREIGN KEY ("fk_grupo") REFERENCES "grupo" ("id");
    `)
  }
};
