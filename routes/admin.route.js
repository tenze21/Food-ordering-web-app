const router = require("express").Router();
const adminPagesController = require("../controllers/adminPages.controller");

router.get("/food", adminPagesController.getFood);
router.get("/drinks", adminPagesController.getDrinks);

module.exports = router;

