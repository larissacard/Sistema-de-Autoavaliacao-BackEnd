const { Client } = require("pg");
require('dotenv').config();

const cliente = new Client({
  connectionString: process.env.DB_URL
});

module.exports = cliente;