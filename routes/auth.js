/*
    Users Routes
    /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');

const {
  loginUser,
  revalidateToken,
  verifyUser,
  sendCodeForChangeNumber,
} = require('../controllers/auth');

const { validateJWT, validateFields, isNewUser } = require('../middlewares');

const {
  checkUserExistsById,
  checkUserExistsByEmail,
} = require('../helpers/db-validators');

const router = Router();

router.post(
  '/',
  [
    check('email', 'The email is required').isEmail(),
    check('email').custom((email) => checkUserExistsByEmail(email, true)),
    check('password', 'The password is required').not().isEmpty(),
    validateFields,
  ],
  loginUser
);

router.post(
  '/verify',
  [
    check('phone', 'The number phone is required').not().isEmpty(),
    check('code', 'The code is required').not().isEmpty(),
    check('code', 'The code must have 6 numbers.').isNumeric().isLength(6),
    validateFields,
  ],
  verifyUser
);

router.post(
  '/number',
  [
    check('phone', 'The number phone is required').not().isEmpty(),
    check('uid', 'The uid is required').not().isEmpty(),
    check('uid', 'Is not valid UID').isMongoId(),
    check('uid').custom(checkUserExistsById),
    validateFields,
    isNewUser,
  ],
  sendCodeForChangeNumber
);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;
