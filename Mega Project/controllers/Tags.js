const Tag = require('../models/Tags')

// create tag handler
exports.createTag = async(req,res) => {
    try{
        // fetch data from req body
        const {name, description} = req.body;

        // validate
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        // create entry in db
        const tagDetails = await Tag.create({name,description});
        console.log(tagDetails);

        // return response
        return res.status(200).json({
            success:true,
            message:"Tag Created Successfully",
        })

    } catch(error){
        console.log("Error Occured while creating tag", error)
        return res.status(200).json({
            success:false,
            message:error.message
        })
    }
}

// function for read all tag
exports.showAllTag = async(req,res) => {
    try{
        const allTag = await Tag.find({},{name:true, description:true});

        return res.status(200).json({
            success:true,
            message:"All tags fetched successfully",
            allTag
        })

    } catch(error){
        console.log("Error Occured while reading all tag", error)
        return res.status(200).json({
            success:false,
            message:error.message
        })
    }
}