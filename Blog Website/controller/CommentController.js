const Post = require('../model/PostModel');
const Comment = require('../model/CommentModel');

exports.createComment = async(req,res) => {
    try{
        // fetch data from request body
        const {post, user, body} = req.body;

        // create a comment object
        const response = new Comment({
            post,user,body
        });

        // save the new comment object into database
        const savedComment = await response.save();

        // find the post by id, add the new comment in its comment array
        const updatePost = await Post.findByIdAndUpdate(post, {$push:{comments: savedComment._id}},{new:true}).populate("comments").exec(); //populate the comments array with comment documents

        res.status(200).json({
            post:updatePost,
        })
    } catch(error) {
        console.log(error);
        console.error(error.message);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}