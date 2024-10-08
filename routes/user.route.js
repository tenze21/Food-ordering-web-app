const router= require('express').Router();
const {getHome, getDrinks}= require('../controllers/userPages.controller')

router.get('/home', getHome);
router.get('/drinks', getDrinks);

module.exports= router;