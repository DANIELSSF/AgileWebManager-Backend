const mongoose = require('mongoose');

const dbConnection = async () => {
  //  Ensures that all queries are limited to the keys defined in the schema
  mongoose.set('strictQuery', true);
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log('Connected to the DB');
  } catch (error) {
    console.log(error);
    throw new Error('Unable to access the database');
  }
};

module.exports = {
  dbConnection,
};
