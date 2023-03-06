const fs = require('fs');

const writefile = ({ip,user,date,operation}) => {
    fs.appendFile('./file/auditLog.txt', `Usuario: ${user}, ip: ${ip}, accion: ${operation}, fecha: ${date}.\n`, function (err) {
        if (err) throw err;
        console.log('¡El archivo ha sido actualizado!');
    });

}

module.exports = { writefile }