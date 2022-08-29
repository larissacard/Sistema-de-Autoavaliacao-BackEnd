'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE usuario DROP COLUMN cpf;

      ALTER TABLE usuario ADD COLUMN cpf CHAR(11) UNIQUE;
    `)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE usuario DROP COLUMN cpf;

      ALTER TABLE usuario ADD COLUMN cpf CHAR(11);
    `)
  }
};
