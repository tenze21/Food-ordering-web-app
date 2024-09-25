const router= require('express').Router();
const {getHome}= require('../controllers/index.controller')

router.get('/home', getHome);

module.exports= router;