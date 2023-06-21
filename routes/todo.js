/*
    Todo Routes
    /api/todos
*/
const { Router } = require('express');
const { check } = require('express-validator');

const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todo');

const {
  validateJWT,
  validateFields,
  validateUserPermissions,
} = require('../middlewares');

const {
  checkTableExistsById,
  validStatus,
  checkTodoExistsById,
} = require('../helpers/db-validators');

const router = Router();

router.get('/', validateJWT, getTodos);

router.post(
  '/',
  [
    validateJWT,
    validateUserPermissions,
    check('tableId', 'Not valid ID').isMongoId(),
    check('tableId').custom(checkTableExistsById),
    check('name', 'The name is required').not().isEmpty(),
    check('desc', 'The description is required').not().isEmpty(),
    check('status').custom((status) => {
      if (!validStatus.has(status)) {
        throw new Error('Invalid status');
      }
      return true;
    }),
    validateFields,
  ],
  createTodo
);

router.put(
  '/:id',
  [
    validateJWT,
    validateUserPermissions,
    check('id', 'Not valid ID').isMongoId(),
    check('id').custom(checkTodoExistsById),
    check('status')
      .optional()
      .custom((status) => {
        if (!validStatus.has(status)) {
          throw new Error('Invalid status');
        }
        return true;
      }),
    validateFields,
  ],
  updateTodo
);

router.delete(
  '/:id',
  [
    validateJWT,
    validateUserPermissions,
    check('id', 'Not valid ID').isMongoId(),
    check('id').custom(checkTodoExistsById),
    validateFields,
  ],
  deleteTodo
);

module.exports = router;
