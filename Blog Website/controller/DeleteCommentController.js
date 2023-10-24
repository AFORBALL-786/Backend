const Post = require("../model/PostModel");
const Comment = require("../model/CommentModel");

exports.deleteComment = async(req,res) => {
    try{
        // fetch the data from request body
        const {post,comment} = req.body;

        // delete the comment from comment array using comment id
        const deleteComment = await Comment.findByIdAndDelete(comment);

        // update the post after deleting comment
        const updatePost = await Post.findByIdAndUpdate(post,{$pull:{comments: comment}}, {new:true}).populate("comments").exec();

        res.status(200).json({
            post:updatePost
        })

    } catch (error) {
        console.log(error);
        console.error(error.message);
        return res.status(500).json({
            message:"Error in UnLike"
        })
    }
}