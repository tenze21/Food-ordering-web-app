const router= require('express').Router();
const {getHome, getDrinks, getCart}= require('../controllers/userPages.controller');
const {getUserOrder, placeOrder}= require('../controllers/orderApi.controller');

router.get('/home', getHome);
router.get('/drinks', getDrinks);
router.get('/cart', getCart);
router.route('/order').get(getUserOrder).post(placeOrder);

module.exports= router;