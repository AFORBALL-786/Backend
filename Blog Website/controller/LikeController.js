const Post = require('../model/PostModel');
const Like = require('../model/LikeModel');

// like post
exports.likePost = async(req, res) => {
    try{
        // fetch data from request body
        const {post,user}  = req.body;

        // create a object of like data
        const response = new Like({
            post,user
        })

        // put into the data base
        const savedLiked = await response.save();

        //find the post by id, add the new like in its liked array
        const updatePost = await Post.findByIdAndUpdate(post, {$push:{likes: savedLiked._id}}, {new:true}).populate('likes').exec();

        res.status(200).json({
            post:updatePost
        })


    } catch (error) {
        console.log(error);
        console.error(error.message);
        return res.status(500).json({
            message:"Error in Like"
        })
    }
}
