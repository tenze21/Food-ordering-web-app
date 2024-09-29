const router = require("express").Router();
const adminPagesController = require("../controllers/adminPages.controller");

router.get("/food", adminPagesController.getFoodPage);
router.get("/drinks", adminPagesController.getDrinksPage);

module.exports = router;

