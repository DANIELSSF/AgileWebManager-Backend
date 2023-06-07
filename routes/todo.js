/*
    Todo Routes
    /api/todos
*/
const { Router } = require("express");
const { getTodos, createTodo, updateTodo, deleteTodo } = require("../controllers/todo");
const router = Router();

router.get(
    "/",
    getTodos 
);

router.post(
  "/",
  createTodo 
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