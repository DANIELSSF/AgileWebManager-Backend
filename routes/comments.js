/*
    Comments Routes
    /api/comments
*/
const { Router } = require("express");
const { createComment, deleteComment, getComments } = require("../controllers/comment");
const router = Router();

router.get(
    "/",
    getComments
);

router.post(
  "/",
  createComment 
);

router.delete(
    "/:id",
    deleteComment
);



module.exports = router;