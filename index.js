require('dotenv').config();
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')


// crear el servidor de express
const app = express();

//Cors
app.use( cors() )

//CArpeta públic
app.use( express.static('public'))

// Lectura y parseo del body
app.use( express.json() )

//Base de datos
dbConnection();

// rutas
app.use( '/api/users', require('./routes/user') );
app.use( '/api/hospitals', require('./routes/hospitals') );
app.use( '/api/medics', require('./routes/medics') );
app.use( '/api/search', require('./routes/general-search') );
app.use( '/api/files', require('./routes/files') );
app.use( '/api/login', require('./routes/auth') );










app.listen( process.env.PORT, () => {
    console.log('servidor corriendo en el puerto:' + process.env.PORT);
})