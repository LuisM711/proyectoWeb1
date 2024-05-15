const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('bddWeb', 'root', 'pass', {
    dialect: 'sqlite',
    host: './db.sqlite3'
});
module.exports = sequelize;