/*
    Users Routes
    /api/auth
*/
const { Router } = require("express");
const {
  createUser,
  loginUser,
  getUsers,
  updateUser,
  deleteUser,
  sendCode,
  verificationNumber,
  revalidateToken,
  generateToken,
} = require("../controllers/auth");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.get("/", getUsers);

router.get("/renew", validateJWT, revalidateToken);

router.post("/new", createUser);

router.post("/", loginUser);

router.post("/send", sendCode);

router.post("/verify", verificationNumber);

router.post("/token", generateToken);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
