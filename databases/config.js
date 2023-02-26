const mongoose = require('mongoose');

const dbConnection = async () => {
//  asegura de que todas las consultas estén limitadas a las claves definidas en el esquema
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