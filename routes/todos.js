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
  UpdateTodo //TODO: Update Todo
);

router.delete(
    "/:id",
    deleteTodo //TODO: Delete Todo
);



module.exports = router;