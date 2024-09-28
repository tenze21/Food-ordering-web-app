const router = require("express").Router();
const adminPagesController = require("../controllers/adminPages.controller");

router.get("/food", adminPagesController.getHome);

module.exports = router;

