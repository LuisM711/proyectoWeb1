//const bcrypt = require('bcryptjs');
//const jsonwebtoken = require('jsonwebtoken');
//const EmpleadoModel = require('../models/EmpleadoModel');
//const verification = require("../middlewares/verification");
const { render } = require('pug');
const ProductoModel = require('../models/Producto');
const UsuarioModel = require('../models/Usuario');
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
    // const cookieName = 'jwt';
    // res.clearCookie(cookieName);
    res.render('login', { error: 'Sesión cerrada' });
}
module.exports.authenticate = async (req, res) => {
    try {
        const { email, password } = req.body;
        const usuario = await UsuarioModel.findOne({ where: { correo: email } });
        if (!usuario) {
            return res.render('login', { error: 'Correo no encontrado' });
        }
        if (password === usuario.password) {
            return res.render('principal');
        } else {
            return res.render('login', { error: 'Contraseña incorrecta' });
        }
    } catch (error) {
        //console.log(error);
        return res.render('login', { error: 'Error al autenticar' });
    }
};