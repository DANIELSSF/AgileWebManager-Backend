/*
    Comments Routes
    /api/comments
*/
const { Router } = require('express');

const {
  createComment,
  deleteComment,
  getComments,
} = require('../controllers/comment');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', getComments);

router.post('/', validateJWT, createComment);

router.delete('/:id', deleteComment);

module.exports = router;
