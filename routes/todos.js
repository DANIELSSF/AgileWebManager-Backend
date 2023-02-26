/*
    Todo Routes
    /api/todos
*/
const { Router } = require("express");
const router = Router();

router.get(
    "/",
    getTodos //TODO: Get all Todos
);

router.post(
  "/",
  createTodo //TODO: create Todo
);

router.put(
  "/:id",
  UpdateTodo //TODO: UpdateTodo
);


router.put(
    "/:id",
    editUser //TODO: Get all users
);


router.delete(
    "/:id",
    deleteUser //TODO: Get all users
);



module.exports = router;