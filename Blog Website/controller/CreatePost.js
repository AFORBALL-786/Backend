const Post =require("../model/PostModel");

exports.createPost = async(req, res) => {
    try{
        // fetch the data from req body
        const {title,body} = req.body;

        // create a new object
        const post = new Post({
            title,body
        }) 

        // insert into database
        const newPost = await post.save();

        // sending response
        res.status(200).json({
            post : newPost
        })


    } catch(error) {
        console.log(error);
        console.error(error.message);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}