/*
    Users Routes
    /api/auth
*/
const { Router } = require("express");
const { createUser, loginUser, getUsers, editUser, deleteUser } = require("../controllers/auth");
const router = Router();

router.post(
  "/new",
  createUser 
);

router.post(
  "/",
  loginUser 
);

router.get(
    "/",
    getUsers 
);

router.put(
    "/:id",
    editUser 
);

router.delete(
    "/:id",
    deleteUser 
);



module.exports = router;