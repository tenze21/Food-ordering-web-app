const router = require("express").Router();
const authController = require("../controllers/auth.controller");

router.route('/login').get(authController.getLogin).post(authController.authenticateUser);

router.route('/register').get(authController.getRegister).post(authController.createUser);

module.exports= router;