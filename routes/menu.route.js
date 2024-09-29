const express = require('express')
const router = express.Router();
const menuController = require('../controllers/menu.controller');

//Routes for drinks
router.put('/drinks/:id', menuController.updateDrink)

//Routes for food menu
router.put('/food/:id', menuController.updateFood)

module.exports = router;