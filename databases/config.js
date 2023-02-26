const mongoose = require('mongoose');

const dbConnection = async () => {
    //  Ensures that all queries are limited to the keys defined in the schema
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conectado a la BD')
    } catch (error) {
        throw new Error('No se pudo acceder a la base de datos');
        console.log(error);
    }
}

module.exports = {
    dbConnection,
}