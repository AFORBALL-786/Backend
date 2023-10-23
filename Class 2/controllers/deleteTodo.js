const todo = require('../model/todoSchema')

exports.deleteTodo = async(req,res) => {
    try{
        // fetching data from database using id
        const id = req.params.id;

        // fetching data from request body which we want to update
        await todo.findByIdAndDelete(id)

        res.status(404).json({
            sucess:true,
            message:`Todo ${id} Deleted Sucessfuly`,
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            sucess:false,
            message:"Internal Server, Please try again",
        })
    }
}