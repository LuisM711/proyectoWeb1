const ProductoModel = require('../models/Producto');

module.exports.wishlist = async (req, res) => {
    if(req.session.informacion){
        //console.log(req.session);
        const productos = req.session.informacion.wishlist || [];
        const wishlist = await Promise.all(productos.map(async id => {
            return await ProductoModel.findByPk(id);
        }));
        res.render('wishlist', { wishlist });
    }
    else{
        res.render('wishlist');
    }


};
