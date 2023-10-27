const File = require('../model/FileSchema');

exports.localFileUpload = async(req,res) => {
    try{
        // fetch file from request body
        const file = req.files.file;
        console.log("File is ->",file);

        // path where we want to upload
        const path = __dirname + '/files/' + Date.now() + `.${file.name.split('.').slice(-1)[0]}`;

        // using mv function for moving file 
        file.mv(path);

        // sending response
        res.status(200).json({
            success:true,
            message:`Local File Upload Successfully`
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}