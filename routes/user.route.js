const router= require('express').Router();
const {getHome, getDrinks, getCart}= require('../controllers/userPages.controller')

// Route for the home page
router.get('/home', getHome);
router.get('/drinks', getDrinks);
router.get('/cart', getCart);

module.exports= router;