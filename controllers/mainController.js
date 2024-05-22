const { DataTypes } = require('sequelize');
const product = require('../models/Producto.js');
module.exports.index = async (req, res) => {
    try {
        const products = await product.findAll();
        res.render('principal', { products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Internal Server Error');
    }

    res.render('principal');
};