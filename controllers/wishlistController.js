const ProductoModel = require('../models/Producto');

module.exports.wishlist = async (req, res) => {
    try {
        console.log(req.session);
        const productos = req.session.informacion.wishlist || [];
        const wishlist = await Promise.all(productos.map(async id => {
            return await ProductoModel.findByPk(id);
        }));
        console.log(wishlist);
        res.json(wishlist);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocurrió un error al obtener la lista de deseos.' });
    }
};
