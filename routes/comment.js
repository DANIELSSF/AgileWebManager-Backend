/*
    Comments Routes
    /api/comments
*/
const { Router } = require('express');
const { check } = require('express-validator');

const {
  validateJWT,
  isCreatorComment,
  validateFields,
} = require('../middlewares');

const {
  createComment,
  deleteComment,
  getComments,
} = require('../controllers/comment');

const {
  checkCommentExistsById,
  checkTodoExistsById,
} = require('../helpers/db-validators');

const router = Router();

router.get('/', validateJWT, getComments);

router.post(
  '/',
  [
    validateJWT,
    check('todoId', 'Not valid ID').isMongoId(),
    check('todoId').custom(checkTodoExistsById),
    check('comment', 'The comment in required').not().isEmpty(),
    validateFields,
  ],
  createComment
);

router.delete(
  '/:id',
  [
    check('id', 'Not valid ID').isMongoId(),
    check('id').custom(checkCommentExistsById),
    validateJWT,
    validateFields,
    isCreatorComment,
  ],
  deleteComment
);

module.exports = router;
