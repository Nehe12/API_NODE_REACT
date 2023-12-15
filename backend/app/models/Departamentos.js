const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

const Departamento = sequelize.define('Departamento', {
  nombre_departamento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Otros campos...
});

module.exports = Departamento;