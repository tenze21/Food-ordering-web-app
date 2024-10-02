const express = require('express')
const router = express.Router();
const menuController = require('../controllers/menu.controller');

router.route('/food').get(menuController.getFood).post(menuController.addFood);
router.route('/drinks').get(menuController.getDrinks).post(menuController.addDrink);

//Routes for drinks
router.put('/drinks/:id', menuController.updateDrink);

//Routes for food menu
router.put('/food/:id', menuController.updateFood);

module.exports = router;