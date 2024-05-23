// models/Producto.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');
const Tipo = require('./Tipo.js');

class Producto extends Model {}

Producto.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  url_Image: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: { // Cambiamos el nombre del campo para la relación
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Tipo', // Nombre del modelo en singular
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Producto',
  tableName: 'productos',
  timestamps: false
});

// Definimos la relación Producto - Tipo
Producto.belongsTo(Tipo, { foreignKey: 'tipo', as: 'tipoProducto' });
// Producto.belongsTo(Tipo, { foreignKey: 'tipo' });

module.exports = Producto;
