const router= require('express').Router();
const { getProfile } = require('../controllers/auth.controller');
const {getHome, getDrinks, getCart, getOrders}= require('../controllers/userPages.controller');
const {placeOrder}= require('../controllers/orderApi.controller');

// Route for the home page
router.get('/home', getHome);
router.get('/drinks', getDrinks);
router.get('/cart', getCart);
router.get('/profile', getProfile);
router.route('/orders').get(getOrders).post(placeOrder);

module.exports= router;