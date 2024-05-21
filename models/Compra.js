const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database.js');
const { type } = require('express/lib/response');
const { FOREIGNKEYS } = require('sequelize/lib/query-types');

class Compra extends Model { }
Compra.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})