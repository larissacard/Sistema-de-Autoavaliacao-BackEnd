'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.sequelize.query(`
      ALTER TABLE respostas ADD COLUMN id serial primary key;
    `)
  },

  async down (queryInterface, Sequelize) {
    queryInterface.sequelize.query(`
      ALTER TABLE respostas DROP COLUMN id;
    `)
  }
};
