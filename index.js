require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')


// crear el servidor de express
const app = express();

//Cors
app.use( cors() )

// Lectura y parseo del body
app.use( express.json() )

//Base de datos
dbConnection();

// rutas
app.use( '/api/users', require('./routes/user') );
app.use( '/api/login', require('./routes/auth') );










app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en el puerto:' + process.env.PORT);
})