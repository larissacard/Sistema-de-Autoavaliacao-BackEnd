'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TABLE "permissoes" (
      "id" bigserial PRIMARY KEY,
      "descricao" text NOT NULL,
      "created_at" timestamp NOT NULL DEFAULT (now()),
      "updated_at" timestamp NOT NULL DEFAULT (now())
    );

    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON permissoes
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
    `);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permissoes');
  }
};