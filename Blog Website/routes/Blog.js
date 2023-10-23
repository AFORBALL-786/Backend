const express = require('express');
const router = express.Router();

// import controller
const {createComment} = require("../controller/CommentController");

// mapping
router.post('/comments/create', createComment);

// export router
module.exports = router;