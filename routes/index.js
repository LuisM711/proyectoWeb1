const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const mainController = require('../controllers/mainController');
const wishlistController = require('../controllers/wishlistController');
const historialController = require('../controllers/historialController');
const carritoController = require('../controllers/carritoController');
const productosController = require('../controllers/productosController');
const correoController = require('../controllers/correoController');

module.exports = () => {
    router.get('/', mainController.index);
    router.get('/login', loginController.login);
    router.get('/wishlist', wishlistController.wishlist);
    router.get('/historial_de_compras', historialController.historial);
    router.get('/carrito', carritoController.carrito);
    router.get('/productos', productosController.productos);
    router.get('/logout', loginController.logout);
    router.get('/perfil', loginController.perfil);
    router.get('/wishlist/:id', productosController.wishlistPush);
    router.get('/agregar/:id', productosController.agregarCarrito);
    router.get('/cantidadItems', productosController.getCantidadCarrito);	
    router.get('/eliminarWish/:id', productosController.eliminarWish);
    router.get('/borrarCarrito/:id', productosController.eliminarCarrito);
    router.get('/forgotPassword', loginController.forgotPassword);
    router.get('/signin', loginController.signin);


    router.post('/login', loginController.doLogin);
    router.post('/agregar/:id', productosController.agregarAjax);
    router.post('/changePassword', loginController.changePassword);
    router.post('/forgotPassword', correoController.forgotPassword);
    router.post('/register', loginController.registrarUsuario);
    router.post('/pagar', carritoController.pagar);


    //   router.put('/guardarDetallesEmpleado/:idEmpleado',verification.revisarCookie, salariosController.actualizarDatos);
    //   router.put('/actualizarImpuesto', verification.revisarCookie, impuestosController.actualizarImpuesto);


    //   router.delete('/aprobacionPrestamo', verification.revisarCookie, solicitudesController.aprobacionPrestamo);
    //   router.delete('/borrarImpuesto', verification.revisarCookie, impuestosController.borrarImpuesto);

    return router;
};
