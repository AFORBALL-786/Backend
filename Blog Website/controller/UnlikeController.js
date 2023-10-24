const Post = require("../model/PostModel");
const Like = require("../model/LikeModel");

exports.unlikePost = async(req,res) => {
    try{
        // fetch data from request body
        const {post,like} = req.body;

        // one way is to delete only by id of like or both we can use
        const deleteLiked = await Like.findOneAndDelete({post:post, _id : like});

        // update the post
        const updatePost = await Post.findByIdAndUpdate(post, {$pull:{likes: deleteLiked._id}}, {new:true}).populate("likes").exec();

        // send response
        res.status(200).json({
            post:updatePost
        })


    } catch (error){
        console.log(error);
        console.error(error.message);
        return res.status(500).json({
            message:"Error in UnLike"
        })
    }
}