const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            require:true,
        },
        age:{
            type:Number,
            require:true,
        },
        description:{
            type:String,
            require:true,
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


module.exports = mongoose.model('TodoData', todoSchema);