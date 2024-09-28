const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/auth.controller");
const { ensureLoggedIn, ensureLoggedOut } = require("connect-ensure-login");

router
  .route("/")
  .get(ensureLoggedOut({redirectTo: "/user/home"}) ,authController.getLogin)
  .post(
    passport.authenticate("local", {
      // successRedirect: "/user/home",
      successReturnToOrRedirect: "/admin/food",
      failureRedirect: "/",
      failureFlash: true,
    })
  );

router
  .route("/register")
  .get(ensureLoggedOut({redirectTo: "/user/home"}) ,authController.getRegister)
  .post(authController.createUser);

router.get("/logout", ensureLoggedIn({ redirectTo: "/" }),authController.logout);

module.exports = router;
