/*
    Comments Routes
    /api/todos
*/
const { Router } = require("express");
const { createComment } = require("../controllers/comment");
const router = Router();

router.get(
    "/",
    getComments //TODO: Get all Comments
);

router.post(
  "/",
  createComment 
);

router.delete(
    "/:id",
    deleteComment //TODO: Delete Comment
);



module.exports = router;