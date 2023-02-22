const express = require('express');
require('dotenv').config();

const app = express();

// Directorio publico
app.use(express.static('public'));

// Parsear objetos de json
app.use(express.json())

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running in the port: ${process.env.PORT}`);
})