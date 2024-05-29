const CarritoModel = require('../models/Carrito');
const ProductoModel = require('../models/Producto');

module.exports.carrito = async (req, res) => {

    if (req.session.informacion) {
        const carrito = await CarritoModel.findAll({
            where: { idUser: req.session.informacion.id },
            attributes: ['idProducto']
        });
        const productos = await Promise.all(carrito.map(async prod => {
            return await ProductoModel.findByPk(prod.idProducto);
        }));
        console.log(productos);
        return res.render('carrito', { carrito: productos });
    }




    return res.render('carrito');
};