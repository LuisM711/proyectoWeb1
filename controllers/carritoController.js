const CarritoModel = require('../models/Carrito');
const ProductoModel = require('../models/Producto');
const CompraModel = require('../models/Compra');
const { Op } = require('sequelize');

module.exports.carrito = async (req, res) => {

    if (req.session.informacion) {
        const carrito = await CarritoModel.findAll({
            where: { idUser: req.session.informacion.id },
            attributes: ['idProducto']
        });
        const productos = await Promise.all(carrito.map(async prod => {
            return await ProductoModel.findByPk(prod.idProducto);
        }));
        //console.log(productos);
        return res.render('carrito', { carrito: productos });
    }




    return res.render('carrito');
};

module.exports.pagar = async (req, res) => {
    try {
        const carrito = await CarritoModel.findAll({
            where: { idUser: req.session.informacion.id },
            attributes: ['idProducto']
        });
        const productos = await Promise.all(carrito.map(async prod => {
            // Buscar el producto por id y asegurarse de que el stock sea mayor que 0
            const producto = await ProductoModel.findOne({
                where: {
                    id: prod.idProducto,
                    stock: {
                        [Op.gt]: 0
                    }
                }
            });
            return producto;
        }));

        // Filtrar cualquier resultado nulo en caso de que no haya productos con stock > 0
        const productosConStock = productos.filter(producto => producto !== null);
        if (productosConStock.length !== carrito.length) {
            return res.json({ error: "No hay stock de uno o mas productos de los que tiene en su carrito" });
        }

        //restar stock de los productos
        await Promise.all(productosConStock.map(async prod => {
            const producto = await ProductoModel.findByPk(prod.id);
            await producto.update({ stock: producto.stock - 1 });
        }));
        //limpiar el carrito 
        await CarritoModel.destroy({
            where: { idUser: req.session.informacion.id }
        });
        req.session.informacion.carrito = 0;
        //crear la compra
        const compra = await CompraModel.create({
            id: null,
            cliente: req.session.informacion.id,
            compra: JSON.stringify(productosConStock),
            fecha: new Date()
        });




        return res.json({ success: "Compra realizada correctamente" });
    } catch (error) {
        return res.json({ error: "Hubo un error al realizar la transacción" });
    }
    //return res.render('carrito', { carrito: productos });
};