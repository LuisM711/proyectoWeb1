// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../database.js');
// const { type } = require('express/lib/response');
// const { FOREIGNKEYS } = require('sequelize/lib/query-types');
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');
const usuario = require('./Usuario.js');

class Compra extends Model { }
Compra.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    cliente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: usuario,
            key: 'id'
        }
    },
    compra: {
        type: DataTypes.STRING
    },
    fecha: {
        type: DataTypes.DATE
    }

}, {
    sequelize,
    modelName: 'Compra',
    tableName: 'compra',
    timestamps: true
});

Compra.belongsTo(usuario, { foreignKey: 'cliente' });
module.exports = Compra;