const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./databases/config');

// Create express server
const app = express();

//cors
app.use(cors());

// Public directory
app.use(express.static('public'));

// Database connecion
dbConnection();

// Parse json objects
app.use(express.json());

//Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/todos', require('./routes/todo'));
app.use('/api/comments', require('./routes/comment'));
app.use('/api/tables', require('./routes/table'));
app.use('/api/users', require('./routes/user'));

app.listen(process.env.PORT, () => {
  console.log(`Server is running in the port: ${process.env.PORT}`);
});
