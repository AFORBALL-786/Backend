const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const cloudinaryConnect = () => {
    try{
        cloudinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET
        })
        console.log("Cloudinary Connected Sucessfully")
    } catch(error){
        console.log("Cloudinary Can't be Connected");
        console.error(error.message);
        process.exit(1); 
    }
}

module.exports = cloudinaryConnect