const todo = require('../model/todoSchema')

exports.getAllTodo = async(req,res) => {
    try{
        // fetching all data from database
        const response = await todo.find({});
        res.status(200).json({
            sucess:true,
            message:"Data Fetched Sucessfully",
            data : response
        })
    } catch(error){
        console.log(error)
        res.status(500).json({
            sucess:false,
            message:"Internal Server",
        })
    }
}