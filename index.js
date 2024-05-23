const express = require('express');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./database.js');
app.use(cookieParser());

app.use(express.json());

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));

sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos conectada');
}).catch(error => {
  console.log('Error al conectar a la base de datos: ' + error.message);
});
app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.use('/', routes());
app.disable('x-powered-by');
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
