const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .get(authController.getLogin)
  .post(
    passport.authenticate("local", {
      successRedirect: "/home",
      failureRedirect: "/",
      failureFlash: true,
    })
  );

router
  .route("/register")
  .get(authController.getRegister)
  .post(authController.createUser);

module.exports = router;
