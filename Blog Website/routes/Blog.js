const express = require('express');
const router = express.Router();

// import controller
const {createComment} = require("../controller/CommentController");
const {likePost} =require("../controller/LikeController");
const {unlikePost} = require("../controller/UnlikeController");
const {deleteComment} = require("../controller/DeleteCommentController");
const {createPost} = require("../controller/CreatePost");
const {getPost} = require("../controller/GetPost");
 
// mapping
router.post('/comments/create', createComment);
router.post('/likes/like', likePost);
router.post('/likes/unlike', unlikePost);
router.post('/comments/deletecomment', deleteComment);
router.post('/posts/create', createPost);
router.get('/posts', getPost);

// export router
module.exports = router;