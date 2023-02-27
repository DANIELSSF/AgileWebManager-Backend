/*
    Todo Routes
    /api/todos
*/
const { Router } = require("express");
const { getTodos, createTodos, updateTodo, deleteTodo } = require("../controllers/todo");
const router = Router();

router.get(
    "/",
    getTodos 
);

router.post(
  "/",
  createTodos 
);

router.put(
  "/:id",
  updateTodo 
);

router.delete(
    "/:id",
    deleteTodo 
);



module.exports = router;