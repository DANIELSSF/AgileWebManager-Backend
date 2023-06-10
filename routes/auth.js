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
} = require('../controllers/auth');

const { validateJWT, validateFields } = require('../middlewares');
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

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;
