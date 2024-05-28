const { DataTypes } = require('sequelize');

const ProductoModel = require('../models/Producto');
const TipoModel = require('../models/Tipo');
module.exports.index = async (req, res) => {
    try {
        //getProductos
        const productos =  await this.getProductos();
        res.render('principal', {
            data: productos,
        });
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.render('login');
        // res.status(500).send('Error al obtener productos');
    }
};
module.exports.getProductos = async (req, res) => {
    try {
        const productos = await ProductoModel.findAll({
            include: {
                model: TipoModel,
                as: 'tipoProducto',
                attributes: ['valor'],
                where: {
                    id: ProductoModel.sequelize.col('Producto.tipo')  // Assuming Producto is your model name
                }
            }
        });

        // console.log("productos");
        console.log(productos);
        return productos;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        return res.status(500).send('Error al obtener productos');
    }
};