'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    ALTER TABLE usuario
    ALTER COLUMN cpf TYPE CHAR(11);
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
    ALTER TABLE usuario
    ALTER COLUMN cpf TYPE VARCHAR(11) NOT NULL;
    `);
  }
};
