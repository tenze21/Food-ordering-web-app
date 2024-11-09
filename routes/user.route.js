const router= require('express').Router();
const {getHome, getDrinks, getCart, getOrders, getProfile, updateProfile, getReviewPage, createReview, deleteReview}= require('../controllers/userPages.controller');
const {placeOrder}= require('../controllers/orderApi.controller');

// Route for the home page
router.get('/home', getHome);
router.get('/drinks', getDrinks);
router.get('/cart', getCart);
router.get('/profile', getProfile);
router.route('/orders').get(getOrders).post(placeOrder);
router.put('/updateProfile', updateProfile);
router.route('/reviews').get(getReviewPage).post(createReview);
router.delete('/reviews/:id', deleteReview);

module.exports= router;