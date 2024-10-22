const router= require('express').Router();
const {getHome, getDrinks, getCart}= require('../controllers/userPages.controller')

router.get('/home', getHome);
router.get('/drinks', getDrinks);
router.get('/cart', getCart);

module.exports= router;