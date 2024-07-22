const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { checkAuthenticated } = require("../configs/passport");

router.get("/", checkAuthenticated, userController.getUser);

router.post("/login", userController.login);
router.post("/register", userController.register);

module.exports = router;
