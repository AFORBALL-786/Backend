const todo = require('../model/todoSchema')

exports.createTodo = async(req,res) => {
    try{
        const {name,age,description} = req.body;
        await todo.create({name,age,description});
        
        res.status(200).json({
            sucess:true,
            message:"Data Entry Sucessfully"
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            sucess:false,
            message:"Internal Server",
        })
    }

}
