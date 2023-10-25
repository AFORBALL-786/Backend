const user = require('../model/userData');
const bcrypt = require('bcrypt');

exports.signup = async(req,res) => {
    try{
        // fetch the data from request body
        const {name,email,password,role} = req.body;

        // no validation performed
        // check if user already exist
        const existingUser = await user.findOne({email})

        // if valid data found
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already Exist"
            })
        }
        
        let hashedPassword
        try{
            hashedPassword = await bcrypt.hash(password,10);
        } catch(error){
            return res.status(500).json({
                success:false,
                message:"Error while hashig password"
            })
        }

        // create an entry into database
        const data = await user.create({name,email,password:hashedPassword,role})

        // sending response
        return res.status(200).json({
            success:true,
            message:"User Created Sucessfully"
        })

    } catch(error) {
        console.error(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error, please try again later"
        })
    }
}