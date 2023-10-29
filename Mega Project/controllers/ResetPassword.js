const User = require('../models/User');
const mailSender = require('../utils/MailSender');
const bcrypt = require('bcrypt');

// Reset Password Token

exports.resetPasswordToken = async(req,res) => {
    try{
        // fetch the email from request body
        const {email} = req.body;
        // check if user exist or not
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid User"
            })
        }

        // generate token
        const token = crypto.randomUUID();

        // update user by adding token and expiraation time
        const updateDetails = await User.findOneAndUpdate({email},
                                                          {
                                                            token:token,
                                                            tokenExpire : Date.now() + 5*60*1000
                                                          },
                                                          {new:true}
                                                        )

        // create url
        const url = `https://localhost:3000/reset-password/${token}`

        // send mail containing url
        await mailSender(email, 'Password Reset Link', `Password Reset Link : ${url}`)

        // return response
        return res.status(200).json({
            success:true,
            message:"Email Sent Successfully, please check your email"
        })

    } catch(error){
        console.log("Error Occured while sending reset password mail", error)
        return res.status(500).json({
            success:false,
            message:"Error Occured while sending reset password mail"
        })
    }
}

// Reset Password

exports.resetPassword = async(req,res) => {
    try{
        // fetch data
        const {password, token, confirmPassword} = req.body

        // validate data
        if(password !== confirmPassword) {
            return res.status(401).json({
                success:false,
                message:'Password not matched'
            })
        }

        // get user detail from database using token
        const userDetial = await User.findOne({token:token});

        // if no entry exist or if token time expire - invalid token
        if(!userDetial || userDetial.tokenExpire < Date.now()){
            return res.status(401).json({
                success:false,
                message:'Invalid Token'
            })
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password,10);

        // update password in database
        await User.findOneAndUpdate(
            {token:token},{password:hashedPassword},{new:true}
        )

        // return response
        return res.status(200).json({
            success:true,
            message:'Password Reset Successfully'
        })
    } catch(error){
        console.log("Error occured while reseting the password", error);
         return res.status(500).json({
            success:false,
            message:"Error Occured while reset password"
        })
    }
}
