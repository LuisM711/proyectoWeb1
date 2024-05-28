const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');

class Carrito extends Model { }
Carrito.init({
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    idProducto: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Carrito',
    tableName: 'carrito',
    timestamps: false
});

module.exports = Carrito;
