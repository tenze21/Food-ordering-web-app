const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.route('/login').get(authController.getLogin);

module.exports= router;