/* Routes for boards
    host+/api/tables
*/

const { Router } = require('express');
const route = Router();

route.get(
    "/",
    getTables // Table: Get all tables
);

route.post(
    "/",
    createTables // Table: Create
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