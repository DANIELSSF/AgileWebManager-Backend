const fs = require('fs');

const writefile = ({ip,user,date,operation}) => {
    fs.appendFile('./file/auditLog.txt', `Usuario: ${user}, ip: ${ip}, accion: ${operation}, fecha: ${date}.\n`, function (err) {
        if (err) throw err;
        console.log('The file has been updated!');
    });

}

module.exports = { writefile }