const todo = require('../model/todoSchema')

exports.updateTodo = async(req,res) => {
    try{
        // fetching data from database using id
        const id = req.params.id;
        
        // fetching data from request body which we want to update
        const {name,age,description} = req.body;

        const response = await todo.findByIdAndUpdate(
                            id,{name,age,description, updateAt : Date.now()}
                        )

        res.status(404).json({
            sucess:true,
            message:`Todo ${id} Updated Sucessfuly`,
            data:response
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            sucess:false,
            message:"Internal Server or Invalid Id",
        })
    }
}