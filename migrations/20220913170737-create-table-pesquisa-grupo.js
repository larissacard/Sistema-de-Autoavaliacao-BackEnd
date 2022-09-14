'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE pesquisa DROP COLUMN fk_grupo,
      DROP COLUMN data_inicio, 
      DROP COLUMN data_fim;

      CREATE TABLE pesquisa_grupo(
        id serial primary key,
        fk_pesquisa bigint not null,
        fk_grupo bigint not null,
        data_inicio timestamp, 
        data_fim timestamp,
        created_at timestamp not null default (now()),
        updated_at timestamp not null default (now()),
        constraint pesquisa_id
          foreign key(fk_pesquisa)
            references pesquisa(id) on delete set null,
        constraint grupo_id
          foreign key(fk_grupo)
            references grupo(id) on delete set null
      );

      CREATE TRIGGER set_timestamp
      BEFORE UPDATE ON pesquisa_grupo
      FOR EACH ROW
      EXECUTE PROCEDURE trigger_set_timestamp();
    `)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      DROP TABLE IF EXISTS pesquisa_grupo;

      ALTER TABLE pesquisa ADD COLUMN IF NOT EXISTS fk_grupo,
      ADD COLUMN IF NOT EXISTS data_inicio, 
      ADD DOLUMN IF NOT EXISTS data_fim;
    `)
  }
};
