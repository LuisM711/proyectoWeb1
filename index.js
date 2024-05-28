const express = require('express');
const session = require('express-session');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const path = require('path');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./database.js');
const morgan = require('morgan');
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: `${process.env.SECRET}`, // Cambia esta clave secreta
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Asegúrate de usar https
}));
dotenv.config();

sequelize.sync({ force: false }).then(() => {
  console.log('Base de datos conectada');
}).catch(error => {
  console.log('Error al conectar a la base de datos: ' + error.message);
});
app.use((req, res, next) => {
  res.locals.informacion = req.session.informacion;
  next();
});

app.use(express.static('public'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.use('/', routes());
app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
