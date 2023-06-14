/* Routes for boards
    /api/tables
*/

const { Router } = require('express');
const { check } = require('express-validator');

const {
  getTables,
  createTable,
  updateTable,
  deleteTable,
} = require('../controllers/table');

const { validateJWT, validateFields, isAdminRole } = require('../middlewares');

const { checkTableExistsById } = require('../helpers/db-validators');

const route = Router();

route.get('/', validateJWT, getTables);

route.post(
  '/',
  [
    validateJWT,
    isAdminRole,
    check('name', 'The name is required').not().isEmpty(),
    check('desc', 'The description is required').not().isEmpty(),
    validateFields,
  ],
  createTable
);

route.put(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Not valid ID').isMongoId(),
    check('id').custom(checkTableExistsById),
    validateFields,
  ],
  updateTable
);

route.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'Not valid ID').isMongoId(),
    check('id').custom(checkTableExistsById),
    validateFields,
  ],
  deleteTable
);

module.exports = route;
