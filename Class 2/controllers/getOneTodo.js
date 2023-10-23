const todo = require('../model/todoSchema')

exports.getOneTodo = async(req,res) => {
    try{
        // fetching data from database using id
        const id = req.params.id;
        const response = await todo.findById({_id: id})

        // if data not found
        if(!response){
            res.status(404).json({
                sucess:false,
                message:"No Data Found invalid id"
            })
        }

        else{
            res.status(404).json({
                sucess:true,
                message:`Todo ${id} Data Sucessfuly Fetched`,
                data:response
            })
        }


    } catch(error){
        console.log(error)
        res.status(500).json({
            sucess:false,
            message:"Internal Server",
        })
    }
}