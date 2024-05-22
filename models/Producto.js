const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Producto extends Model { }
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
    }
}, {
    sequelize, // Pass the `sequelize` instance
    modelName: 'Producto', // Choose the model name
    tableName: 'productos', // Optional: specify the table name
    timestamps: false // Optional: disable timestamps if you don't want createdAt and updatedAt fields
  });
module.exports = Producto;