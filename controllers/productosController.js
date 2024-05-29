const ProductoModel = require('../models/Producto');
const TipoModel = require('../models/Tipo');
const CarritoModel = require('../models/Carrito');
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

    if (req.session.informacion) {
        const { id } = req.params;
        const productos = await mainController.getProductos();
        req.session.informacion.wishlist = req.session.informacion.wishlist || [];
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
module.exports.agregarCarrito = async (req, res) => {
    //const usuario = await UsuarioModel.findOne({ where: { correo: tbEmail } });
    let path = 'principal'
    if (req.session.informacion) {
        req.session.informacion.carrito = req.session.informacion.carrito || 0;
        const { id } = req.params;
        const idUser = req.session.informacion.id;
        const productos = await mainController.getProductos();
        const cantidadDeUser = await CarritoModel.count({ where: { idUser: req.session.informacion.id } }) || 0;
        const carrito = await CarritoModel.findOne({ where: { idUser: idUser, idProducto: id } });
        if (carrito) {
            req.session.informacion.carrito = cantidadDeUser || 0;
            return res.render(path, { error: 'El producto ya está en el carrito', data: productos });
        }
        req.session.informacion.carrito++;
        document.getElementById('cart-count').textContent = parseInt( document.getElementById('cart-count').textContent)+1;
        await CarritoModel.create({ idUser, idProducto: id });

        return res.render(path, { success: 'Producto agregado al carrito!', data: productos });


    }

    // Si no hay sesión activa, redirigir al usuario a la página de login
    res.redirect('/login');
};
module.exports.agregarAjax = async (req, res) => {
    //const usuario = await UsuarioModel.findOne({ where: { correo: tbEmail } });
    if (req.session.informacion) {
        req.session.informacion.carrito = req.session.informacion.carrito || 0;
        const { id } = req.params;
        const idUser = req.session.informacion.id;
        const cantidadDeUser = await CarritoModel.count({ where: { idUser: req.session.informacion.id } }) || 0;
        const carrito = await CarritoModel.findOne({ where: { idUser: idUser, idProducto: id } });
        if (carrito) {
            console.log(cantidadDeUser)
            req.session.informacion.carrito = cantidadDeUser || 0;
            return res.json({ error: 'El producto ya está en el carrito' });
        }
        await CarritoModel.create({ idUser, idProducto: id });
        req.session.informacion.carrito+=1;
        return res.json({ success: 'Producto agregado al carrito!' });

    }
    else return res.json({ error: 'Debes iniciar sesión' });
    // Si no hay sesión activa, redirigir al usuario a la página de login
};
module.exports.getCantidadCarrito = async (req, res) => {

    if (req.session.informacion) {
        const cantidad = await CarritoModel.count({ where: { idUser: req.session.informacion.id } }) || 0;
        req.session.informacion.carrito = cantidad;
    }



};
module.exports.eliminarWish = async (req, res) => {
    if (req.session.informacion) {
        const { id } = req.params;
        const productos = req.session.informacion.wishlist || [];
        const index = productos.indexOf(id);
        if (index > -1) {
            productos.splice(index, 1);
        }
        req.session.informacion.wishlist = productos;
        res.redirect('/wishlist');
    }
    else {
        res.redirect('/login');
    }
}
module.exports.eliminarCarrito = async (req, res) => {
    if (req.session.informacion) {
        const { id } = req.params;
        const idUser = req.session.informacion.id;
        req.session.informacion.carrito--;
        await CarritoModel.destroy({ where: { idUser, idProducto: id } });
        res.redirect('/carrito');
    }
    else {
        res.redirect('/login');
    }
}