const CompraModel = require('../models/Compra');
module.exports.historial = async (req, res) => {
    try {
        // Buscar todas las compras del id del usuario en el modelo de Compra
        let compras = await CompraModel.findAll({
            where: {
                cliente: req.session.informacion.id
            }
        });
        compras.forEach(compra => {
            // Convertir la cadena de texto a un array
            compra.compra = JSON.parse(compra.compra);
        });
        // Mandar esos datos a la vista
        return res.render('compras', { compras: compras });
    } catch (error) {
        // Manejar el error en caso de que ocurra
        console.error(error);
        return res.render('login', { error: 'Inicie sesión para acceder a su historial' });
    }
};