/*
    Users Routes
    /api/auth
*/
const { Router } = require("express");
const { createUser, loginUser, getUsers, updateUser, deleteUser, sendCode, verificationNumber } = require("../controllers/auth");
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
  updateUser
);

router.delete(
  "/:id",
  deleteUser
);

router.post(
  "/send",
  sendCode,
);

router.post(
  "/verify",
  verificationNumber,
);


module.exports = router;