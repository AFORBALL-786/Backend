const Post = require("../model/PostModel");

exports.getPost = async(req,res) => {
    try{
        const posts = await Post.find().populate("likes").populate("comments").exec();

        res.status(200).json({
            message:"Fetched All Post Sucessfully:",
            post:posts
        })


    } catch (error) {
        console.log(error);
        console.error(error.message);  
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}