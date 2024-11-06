const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menu.controller");


//Routes for drinks
router.route("/drinks").get(menuController.getDrinks);
router.put("/drinks/:id", ensureAdmin, menuController.updateDrink);

//Routes for food menu
router.route("/food").get(menuController.getFood);
router.put("/food/:id", ensureAdmin, menuController.updateFood);

function ensureAdmin(req, res, next) {
  if (req.user.role === "admin") {
    next();
  } else {
    res.redirect("/user/home");
  }
}

module.exports = router;
