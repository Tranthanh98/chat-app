const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/api/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "login fail",
  });
});

router.post("/google", authController.googleAuth);

// router.get(
//   "/google/callback",
//   passport.authenticate("google", {
//     successRedirect: "http://localhost:3000",
//     failureRedirect: "/login/failed",
//   }),
//   (req, res) => {
//     console.log("req", req.body, req.params);
//   }
// );

// Protected route example
// router.get("/profile", authController.ensureAuthenticated, (req, res) => {
//   res.send(`Hello, ${req.user.username}`);
// });

// router.post("/login");

module.exports = router;
