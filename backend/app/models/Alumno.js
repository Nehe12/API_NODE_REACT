const { DataTypes } = require('sequelize');
const sequelize = require('../../database/database');

const Alumno = sequelize.define('Alumno', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_p: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido_m: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Otros campos...
});

module.exports = Alumno;