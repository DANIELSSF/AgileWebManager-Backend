/* Routes for boards
    host+/api/tables
*/

const { Router } = require('express');
const { getTables, createTable, updateTable, deleteTable } = require('../controllers/table');
const route = Router();

route.get(
    "/",
    getTables
);

route.post(
    "/",
    createTable
);

route.put(
    "/:id",
    updateTable 
);

route.delete(
    "/:id",
    deleteTable 
);

module.exports = route;