const user = require('../model/userData');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async(req,res) => {
    try{
        // fetch all data from request body
        const {email, password} = req.body;

        // validation
        // check whether input field is input
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"please fill the all detail."
            })
        }

        // check whether email is absent from database
        let present = await user.findOne({email});
        if(!present){
            return res.status(404).json({
                success:false,
                message:"Invalid email"
            })
        }

        // checking if password donot match
        if(!await bcrypt.compare(password, present.password)){
            return res.status(401).json({
                success:false,
                message:"Passoword Incorrect"
            })
        }

        // if password matched
        else{
            // creating a token
            const payload = {
                email:present.email,
                id:present._id,
                role:present.role
            };

            let token = jwt.sign(payload,
                                 process.env.JWT_SECRET_KEY,
                                 {
                                    expiresIn:"2h",
                                 });
            
            present = present.toObject()
            present.token = token
            present.password = undefined;

            // creating a cookie and sending as a response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                present,
                message:"User Logged in Successfully"
            })
        }

    } catch(error){
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:"Internal Server Issue, Please try again"
        })
    }
}