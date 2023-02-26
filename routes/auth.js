/*
    Users Routes
    /api/auth
*/
const { Router } = require("express");
const router = Router();

router.post(
  "/new",
  createUser //TODO: create user
);

router.post(
  "/",
  loginUser //TODO: login
);

router.get(
    "/",
    getUsers //TODO: Get all users
);

router.put(
    "/:id",
    editUser //TODO: Get all users
);

router.delete(
    "/:id",
    deleteUser //TODO: Delete Todo
);



module.exports = router;