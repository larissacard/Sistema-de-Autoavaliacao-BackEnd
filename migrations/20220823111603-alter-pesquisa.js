'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE pesquisa
      ADD COLUMN titulo VARCHAR(120);
    `);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE pesquisa
      DROP COLUMN titulo;
    `);
  }
};
