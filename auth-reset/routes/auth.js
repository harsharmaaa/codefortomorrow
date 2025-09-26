const express = require("express");
const { signup, login, forgotPassword, resetPassword } = require("../controller/authCtrl");
const { getUser } = require("../controller/userCtrl");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/me", getUser);

module.exports = router;
