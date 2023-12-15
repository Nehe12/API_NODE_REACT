const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

const Usuario = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Otros campos...
});

module.exports = Usuario;