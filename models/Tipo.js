// models/Tipo.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

class Tipo extends Model {}

Tipo.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  valor: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Tipo',
  tableName: 'tipos',
  timestamps: false
});

module.exports = Tipo;
