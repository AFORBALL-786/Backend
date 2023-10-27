const File = require('../model/FileSchema');
const cloudinary = require('cloudinary').v2;

// function for generating random strings

function generateString(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) 
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

exports.uploadImage = async(req,res) => {
    try{
        // fetch the data from request body
        const {name,email,tags} = req.body;
        console.log(name,email,tags);
        const file = req.files.imageFile;
        console.log(file);

        //performing simple validation
        const supportedType = ["jpeg", "svg", "png", "jpg"];
        const fileType = file.name.split('.').slice(-1)[0].toLowerCase();
        console.log(fileType)

        // checking if file supported
        if(! supportedType.includes(fileType)){
            res.json({
                success:false,
                message:"File Format not Supported"
            })
        }

        // uploading image to cloudinary
        const option = {
            public_id :`${file.name.split('.')[0]}_` + generateString(7),
            use_filename: true,
            unique_filename: false,
            overwrite: false,
            resource_type: "auto",
            folder : "Demo"
        }

        const result = await cloudinary.uploader.upload(file.tempFilePath,option)
        console.log(result)

        // creating an entry in database
        await File.create({name,email,tags,secure_Url:result.secure_url})

        // sending response
        res.status(200).json({
            success:true,
            url:result.secure_url,
            message:"Image Uploaded Successfully"
        })

    } catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:'Something is went wrong'
        })
    }
}