/*
    Users Routes
    /api/users
*/
const { Router } = require('express');

const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require('../controllers/user');

const { validateJWT } = require('../middlewares/validate-jwt');
const router = Router();

router.get('/', getUsers);

router.post('/', validateJWT, createUser);

router.put('/:id', updateUser);

router.delete('/:id', validateJWT, deleteUser);

module.exports = router;
