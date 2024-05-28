const ProductoModel = require('../models/Producto');
const TipoModel = require('../models/Tipo');
const mainController = require('./mainController');
module.exports.productos = async (req, res) => {
    // try {
    //     const productos = await ProductoModel.findAll({
    //         include: {
    //             model: TipoModel,
    //             as: 'tipoProducto',
    //             attributes: ['valor'], 
    //             where: {
    //                 id: ProductoModel.sequelize.col('Producto.tipo')  // Assuming Producto is your model name
    //             }
    //         }
    //     });

    //     // console.log("productos");
    //     console.log(JSON.stringify( productos));
    //     res.render('productos', {
    //         data: productos,
    //     });
    // } catch (error) {
    //     console.error('Error al obtener productos:', error);
    //     res.status(500).send('Error al obtener productos');
    // }
};
module.exports.wishlistPush = async (req, res) => {
    // Verificar si el usuario tiene una sesión activa
    if (req.session.informacion) {
        const { id } = req.params;
        const productos = await mainController.getProductos();
        
        // Verificar si existe la lista de deseos en la sesión
        req.session.informacion.wishlist = req.session.informacion.wishlist || [];
        
        // Verificar si el producto ya está en la lista de deseos
        if (req.session.informacion.wishlist.includes(id)) {
            return res.render('principal', { error: 'El producto ya está en la lista de deseos', data: productos });
        } else {
            req.session.informacion.wishlist.push(id);
            return res.render('principal', { success: 'Producto agregado a la lista de deseos', data: productos });
        }
    }
    
    // Si no hay sesión activa, redirigir al usuario a la página de login
    res.redirect('/login');
};
