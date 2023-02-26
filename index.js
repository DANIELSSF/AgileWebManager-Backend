const express = require('express');
const { dbConnection } = require('./databases/config');
require('dotenv').config();

// Crear servidor de express
const app = express();

// Directorio publico
app.use(express.static('public'));

// Conexion a la base de datos
dbConnection();

// Parsear objetos de json
app.use(express.json())

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running in the port: ${process.env.PORT}`);
})