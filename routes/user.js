/*
    Users Routes
    /api/users
*/
const { Router } = require('express');
const { check } = require('express-validator');

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/user');

const {
  validateJWT,
  validateFields,
  validatePasswordIsNotTheSame,
  isCreatorOrAdmin,
} = require('../middlewares');

const {
  checkUserExistsByEmail,
  checkUserExistsById,
} = require('../helpers/db-validators');

const router = Router();

router.get('/', validateJWT, getUsers);

router.post(
  '/',
  [
    check('name', 'The name is required').not().isEmpty(),
    check('email', 'The email is required').isEmail(),
    check('email').custom(checkUserExistsByEmail),
    check('password', 'The password is required').isLength({ min: 6 }),
    check('phone', 'The phone is required').not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom(checkUserExistsById),
    check('email', 'The email must be a valid email address')
      .optional()
      .isEmail(),
    check('email').optional().custom(checkUserExistsByEmail),
    check('password', 'Password must be longer than 6 digits')
      .optional()
      .isLength({
        min: 6,
      }),
    validateFields,
    isCreatorOrAdmin,
    validatePasswordIsNotTheSame,
  ],
  updateUser
);

router.delete(
  '/:id',
  [
    validateJWT,
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom(checkUserExistsById),
    isCreatorOrAdmin,
  ],
  deleteUser
);

module.exports = router;
