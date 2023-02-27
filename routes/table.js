/* Routes for boards
    host+/api/tables
*/

const { Router } = require('express');
const { getTables, createTable, updateTable, deleteTable } = require('../controllers/table');
const route = Router();

route.get(
    "/",
    getTables // Table: Get all tables
);

route.post(
    "/",
    createTable // Table: Create
);

route.put(
    "/:id",
    updateTable // Table: Update
);

route.delete(
    "/:id",
    deleteTable // Table: Delete one table
);

module.exports = route;