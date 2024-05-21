const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');
const { type } = require('express/lib/response');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');
const usuario = require('./Usuario.js');
const producto = require('./Producto.js')
class Wishlist extends Model { }
Wishlist.init({
    cliente: {
        type: DataTypes.INTEGER,
        primaryKey: false,
        allowNull: false,
        references: {
            model: usuario,
            key: 'id'
        }
    },
    producto: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: producto,
            key: 'id'
        }
    }
});
Wishlist.belongsTo(usuario, {foreignKey: 'cliente'}),
Wishlist.belongsToMany(producto, {foreignKey: 'producto' });
module.exports = Compra;