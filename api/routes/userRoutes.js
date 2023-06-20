const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  logoutUser,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", getUser);
router.post("/logout", logoutUser);

module.exports = router;
