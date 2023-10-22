const express = require('express');
const router = express.Router();

// import Controller
const {createTodo} = require('../controllers/createTodo');

// define API routes
router.post("/createTodo", createTodo)

// export router
module.exports = router;