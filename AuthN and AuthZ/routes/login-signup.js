const { Router } = require('express');
const router = Router();

// import controller
const {signup} = require('../controller/signup');

// mapping
router.post('/signup', signup)


// exports
module.exports = router