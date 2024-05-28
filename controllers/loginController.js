//const bcrypt = require('bcryptjs');
//const jsonwebtoken = require('jsonwebtoken');
//const EmpleadoModel = require('../models/EmpleadoModel');
//const verification = require("../middlewares/verification");
const { render } = require('pug');
const ProductoModel = require('../models/Producto');
const UsuarioModel = require('../models/Usuario');
const ProductosController = require('./productosController');
module.exports.login = async (req, res) => {
    // const datos = verification.getUserData(req, res);
    // //console.log(datos);
    // if (datos) {
    //     res.render('principal', {
    //         datos:{...datos}
    //     });
    // } else {
    //     res.render('login');
    // }
    res.render('login');
};

module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.clearCookie('connect.sid');
        res.redirect('/');
    });
}
module.exports.doLogin = async (req, res) => {
    try {
        console.log(JSON.stringify(req.body));
        const { tbEmail, tbPassword, cbRecordar } = req.body;
        console.log(tbEmail, tbPassword);
        const usuario = await UsuarioModel.findOne({ where: { correo: tbEmail } });
        console.log(usuario);
        if (!usuario) {
            console.log("no se encontro el usuario");
            return res.render('login', { error: 'Correo no encontrado' });
        }
        console.log(tbPassword, usuario.correo);
        if (tbPassword === usuario.password) {
            console.log("contraseña correcta");
            req.session.regenerate(async (err) => {
                if (err) {
                    return res.render('login', { error: 'Error al autenticar' });
                }

                req.session.informacion = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    email: tbEmail
                };

                try {
                    await ProductosController.getCantidadCarrito(req, res);
                    if (cbRecordar === "on") {
                        req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000; // 30 days
                    } else {
                        req.session.cookie.expires = false;
                    }

                    return res.redirect('/');
                } catch (error) {
                    console.log(error);
                    return res.render('login', { error: 'Error al autenticar' });
                }
            });
        } else {
            return res.render('login', { error: 'Contraseña incorrecta' });
        }
    } catch (error) {
        console.log(error);
        return res.render('login', { error: 'Error al autenticar' });
    }
};

module.exports.perfil = async (req, res) => {
    try {
        if (req.session.informacion) {
            res.render('perfil');
        }
        else {
            throw new Error('Debes iniciar sesión');
            //res.render('login', { error: 'Debes iniciar sesión' });
        }
    } catch (error) {
        return res.render('login', { error: error });
    }

}
