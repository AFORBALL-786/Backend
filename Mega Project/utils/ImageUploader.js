require('dotenv').config();
const cloudinary = require('cloudinary').v2

// function for generating random strings

function generateString(length) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) 
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    return result;
}

exports.imageUploader = async (file) => {
    
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
            folder : process.env.FOLDER_NAME
        }

        return await cloudinary.uploader.upload(file.tempFilePath,option)
}