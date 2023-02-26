const express = require('express');
const { dbConnection } = require('./databases/config');
require('dotenv').config();

// Create express server
const app = express();

// Public directory
app.use(express.static('public'));

// Database connecion
dbConnection();

// Parse json objects
app.use(express.json())

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running in the port: ${process.env.PORT}`);
})