const mongoose = require('mongoose');
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    secure_Url:{
        type:String,
        required:true
    },
    tags:{
        type:String,
    },
    email:{
        type:String
    }
})

module.exports = mongoose.model('fileData', fileSchema);