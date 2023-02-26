/*
    Comments Routes
    /api/todos
*/
const { Router } = require("express");
const router = Router();

router.get(
    "/",
    getComments //TODO: Get all Comments
);

router.post(
  "/",
  createComment //TODO: create Comment
);

router.delete(
    "/:id",
    deleteComment //TODO: Delete Comment
);



module.exports = router;