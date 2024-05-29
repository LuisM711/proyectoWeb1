const nodemailer = require('nodemailer');
const UsuarioModel = require('../models/Usuario');


module.exports.forgotPassword = async (req, res) => {
    try {
        console.log(req.body)
        //return res.json(req.body);
        const { email } = req.body;
        //se verifica que exista ese usuario en el modelo de usuarios
        const usuario = await UsuarioModel.findOne({ where: { correo: email } });
        if (!usuario) {
            return res.json({ error: 'Correo no encontrado' })
        }
        //se crea una contraseña temporal y se actualiza en la base de datos
        const nuevaContrasena = Math.random().toString(36).slice(-8);
        usuario.password = nuevaContrasena;
        await usuario.save();
        //se envia un correo con la nueva contraseña

        let transporter = nodemailer.createTransport({

            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PWD
            }
        });
        const mensaje = {
            from: process.env.SMTP_USER,
            to: email,
            subject: 'Contraseña solicitada',
            html: `La contraseña de su cuenta ha sido cambiada a <b><u> ${nuevaContrasena} </u></b>por motivos de seguridad, por favor cambie su contraseña en cuanto pueda.`

        };
        const info = await transporter.sendMail(mensaje);
        return res.json({ success: 'Correo enviado satisfactoriamente' });
    } catch (error) {
        res.json({ error: "Ha ocurrido un error al tratar de enviar el mensaje" });
    }


}