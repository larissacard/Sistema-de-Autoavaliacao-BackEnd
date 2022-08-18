'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    CREATE OR REPLACE FUNCTION trigger_set_timestamp()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;

    CREATE TABLE "grupo" (
      "id" bigserial PRIMARY KEY,
      "nome" varchar NOT NULL,
      "status" int,
      "created_at" timestamp NOT NULL DEFAULT (now()),
      "updated_at" timestamp NOT NULL DEFAULT (now())
    );

    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON grupo
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
    
    CREATE TABLE "tipo_usuario" (
      "id" bigserial PRIMARY KEY,
      "nome" varchar(30) NOT NULL
    );
    
    CREATE TABLE "usuario" (
      "id" bigserial PRIMARY KEY,
      "tipo" int NOT NULL,
      "nome" varchar(80) NOT NULL,
      "email" varchar(80) UNIQUE NOT NULL,
      "senha" varchar,
      "cpf" varchar(11) NOT NULL,
      "foto" varchar,
      "fk_grupo" bigint,
      "created_at" timestamp NOT NULL DEFAULT (now()),
      "updated_at" timestamp NOT NULL DEFAULT (now()) 
    );

    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON usuario
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
    
    CREATE TABLE "tipo_pesquisa" (
      "id" bigserial PRIMARY KEY,
      "nome" varchar
    );
    
    CREATE TABLE "pesquisa" (
      "id" bigserial PRIMARY KEY,
      "descricao" text NOT NULL,
      "fk_tipo_pesquisa" int NOT NULL,
      "fk_usuario" int NOT NULL,
      "fk_grupo" bigint NOT NULL,
      "data_inicio" timestamp,
      "data_fim" timestamp,
      "created_at" timestamp NOT NULL DEFAULT (now()),
      "updated_at" timestamp NOT NULL DEFAULT (now())
    );

    CREATE TRIGGER set_timestamp
    BEFORE UPDATE ON pesquisa
    FOR EACH ROW
    EXECUTE PROCEDURE trigger_set_timestamp();
    
    CREATE TABLE "perguntas" (
      "id" bigserial PRIMARY KEY,
      "enunciado" text NOT NULL,
      "fk_pesquisa" bigint
    );
    
    CREATE TABLE "respostas" (
      "fk_usuario" bigint,
      "fk_pergunta" bigint,
      "nota" int NOT NULL,
      "created_at" timestamp DEFAULT (now())
    );
    
    ALTER TABLE "usuario" ADD FOREIGN KEY ("tipo") REFERENCES "tipo_usuario" ("id");
    
    ALTER TABLE "usuario" ADD FOREIGN KEY ("fk_grupo") REFERENCES "grupo" ("id");
    
    ALTER TABLE "pesquisa" ADD FOREIGN KEY ("fk_tipo_pesquisa") REFERENCES "tipo_pesquisa" ("id");
    
    ALTER TABLE "pesquisa" ADD FOREIGN KEY ("fk_usuario") REFERENCES "usuario" ("id");
    
    ALTER TABLE "pesquisa" ADD FOREIGN KEY ("fk_grupo") REFERENCES "grupo" ("id");
    
    ALTER TABLE "perguntas" ADD FOREIGN KEY ("fk_pesquisa") REFERENCES "pesquisa" ("id");
    
    ALTER TABLE "respostas" ADD FOREIGN KEY ("fk_usuario") REFERENCES "usuario" ("id");
    
    ALTER TABLE "respostas" ADD FOREIGN KEY ("fk_pergunta") REFERENCES "perguntas" ("id");
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    DROP TABLE IF EXISTS respostas;
    DROP TABLE IF EXISTS perguntas;
    DROP TABLE IF EXISTS pesquisa;
    DROP TABLE IF EXISTS usuario;
    DROP TABLE IF EXISTS grupo;
    DROP TABLE IF EXISTS tipo_pesquisa;
    DROP TABLE IF EXISTS tipo_usuario;
    `);
  }
};
