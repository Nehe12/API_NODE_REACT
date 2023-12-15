const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('prueba', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;