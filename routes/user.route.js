const router= require('express').Router();
const { getProfile } = require('../controllers/auth.controller');
const {getHome, getDrinks, getCart}= require('../controllers/userPages.controller')

// Route for the home page
router.get('/home', getHome);
router.get('/drinks', getDrinks);
router.get('/cart', getCart);
router.get('/profile', getProfile)

module.exports= router;