const router = require('express').Router();
const { getHome } = require('../controllers/index.controller');

// Route for the home page
router.get('/home', getHome);

module.exports = router;
