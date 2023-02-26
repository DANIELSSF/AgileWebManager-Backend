const mongoose = require('mongoose');

const dbConnection = async () => {
//  ensures that all queries are restricted to the keys defined in the schema
    mongoose.set('strictQuery', true);
    try {

        await mongoose.connect(process.env.DB_CNN);
        console.log('Connected to the DB')
    } catch (error) {
        throw new Error('Unable to access the database');
        console.log(error);
    }
}

module.exports = {
    dbConnection,
}
