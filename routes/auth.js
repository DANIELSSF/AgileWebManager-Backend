/*
    Users Routes
    /api/auth
*/
const { Router } = require("express");
const { createUser, loginUser, getUsers, updateUser, deleteUser, smsAuthentication, startVerificationNumber, verificationNumber } = require("../controllers/auth");
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
// Verifidication

router.post(
  "/send-number",
  startVerificationNumber,
);

router.post(
  "/verify-number",
  verificationNumber,
);


module.exports = router;