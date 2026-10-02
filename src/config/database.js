require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Define como true se quiser ver os comandos SQL no terminal
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Permite conectar com segurança à nuvem do Aiven
      }
    }
  }
);

module.exports = sequelize;