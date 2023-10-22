const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        firstname:{
            type:String,
            require:true,
            maxlength:15,
        },
        lastname:{
            type:String,
            require:true,
            maxlength:15,
        },
        age:{
            type:Number,
            require:true,
        },
        phone:{
            type:Number,
            require:true,
            minlength:10, 
        },
        description:{
            type:String,
            require:true,
            maxlength:30
        },
        createAt:{
            type:Date,
            require:true,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            require:true,
            default:Date.now()
        },
        
    }
)

module.exports = mongoose.model("Schema", todoSchema);