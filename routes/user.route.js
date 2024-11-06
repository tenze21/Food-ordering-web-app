const router= require('express').Router();
const {getHome, getDrinks, getCart, getOrders, getProfile, updateProfile}= require('../controllers/userPages.controller');
const {placeOrder}= require('../controllers/orderApi.controller');

// Route for the home page
router.get('/home', getHome);
router.get('/drinks', getDrinks);
router.get('/cart', getCart);
router.get('/profile', getProfile);
router.route('/orders').get(getOrders).post(placeOrder);
router.put('/updateProfile', updateProfile);

module.exports= router;