/*
    Users Routes
    /api/auth
*/
const { Router } = require('express');

const {
  loginUser,
  revalidateToken,
  verifyUser,
} = require('../controllers/auth');

const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/renew', validateJWT, revalidateToken);

router.post('/', loginUser);

router.post('/verify', verifyUser);

module.exports = router;
