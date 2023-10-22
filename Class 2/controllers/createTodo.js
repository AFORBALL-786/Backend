// import the schema
const company = require('../model/todoSchema');

exports.createTodo = async(req,res) => {
    try{
        // fetch the data from request body
        const {firstname,lastname,age,phone,description} = req.body;

        // insert in the database
        await company.create({firstname,lastname,age,phone,description});

        // sending response
        res.status(200).json({
            sucess:true,
            message:"Entry Created Sucessfully"
        })

    } catch(error){
        console.log(error);
        console.error(error);
        res.status(500).json({
            sucess:false,
            message : "Internal Server Error",
        })
    }
}