const { Router } = require('express');
const router = Router();

// import controller
const {login} = require("../controller/login");
const {signup} = require('../controller/signup');
const {auth} = require('../middleware/auth');
const {isStudent} = require('../middleware/isStudent');
const {isAdmin} = require('../middleware/isAdmin');

// mapping
router.post('/signup', signup);
router.post('/login', login);

// Private Route
router.get('/test', auth, (req,res) => {
    res.json({
        success:true,
        message:"Welcome to the Protected route for Test"
    })
})

router.get('/student', auth, isStudent, (req,res) => {
    res.json({
        success:true,
        message:"Welcome to the Protected route for Student"
    })
})

router.get('/admin',auth, isAdmin, (req,res) => {
    res.json({
        success:true,
        message:"Welcome to the Protected route for Admin"
    })
})

// exports
module.exports = router