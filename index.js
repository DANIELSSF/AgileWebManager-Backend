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


//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/todos", require("./routes/todos"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/tables", require("./routes/table"));

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running in the port: ${process.env.PORT}`);
})