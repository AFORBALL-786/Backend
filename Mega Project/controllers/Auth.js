require('dotenv').config();

const User = require('../models/User');
const Profile = require('../models/Profile')
const OTP = require('../models/OTP');
const otpGenerator = require('otp-generator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// send otp 
exports.sendOTP = async (req,res) => {
    try{
        // fetch email from request body
        const {email} = req.body;

        // check if user already exist
        const userPresent = await User.findOne({email});

        // if already exist then return a response
        if(userPresent){
            return res.status(401).json({
                success:false,
                message:"User already registered",
            })
        }

        // if not then generate an otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false
        })
        console.log('OTP Generated', otp);

        // assuming OTP is unique so creating an object of an OTP
        const otpPayload = {email,otp};

        // create an entry for OTP in database
        const otpData = await OTP.create(otpPayload);
        console.log(otpData);

        // return response successful
        return res.status(200).json({
            success:true,
            message:"OTP Sent Successfully",
        })
    } catch(error){
        console.log("Error while Sending OTP", error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// signup
exports.signUp = async(req,res) => {
    try{
        // data fetch from request body
        const {
            firstname,
            lastname,
            email,
            password,
            confirmPassword,
            role,
            contactNumber,
            otp
        } = req.body;

        // validate data
        if(!firstname || !lastname || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success:false,
                message:"Please Fill All '*' Field",
            })
        }

        //password length must be 8 or greater 
        if(password.length < 8){
            return res.status(400).json({
                success:false,
                message:"Password length at least 8"
            })
        } 

        // 2 password must be match
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password don't match",
            })
        }

        // check user already exist or not
        const userPresent = await User.findOne({email});
        if(userPresent){
            return res.status(400).json({
                success:false,
                message:"User already registered"
            })
        }

        // find most recent OTP stored for the user
        const recentOTP = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOTP);

        // validate OTP
        if(recentOTP.length == 0) {
            // OTP not found
            return res.status(400).json({
                success:false,
                message:"OTP Not Found"
            })
        } else if(otp !== recentOTP.otp){
            // Invalid OTP
            return res.status(400).json({
                success:false,
                message:"Invalid OTP"
            })
        }

        // Hashing Password
        const hashPassword = await bcrypt.hash(password,10)

        // Create entry in Database
        const profileDetails =await Profile.create({
            gender:null,
            dob:null,
            about:null,
            phoneNumber:null,
            profession:null
        })
        const user = ({
            firstname,
            lastname,
            email,
            contactNumber,
            password,
            role,
            addtionalDetail:profileDetails._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`,
        })

        // return response
        return res.status(200).json({
            success:true,
            message:"User is registered Successfully",
        })

    } catch(error){
        console.log("Error while Sign Up", error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// login
exports.login = async(req,res) => {
    try{
        // get data from req body
        const {email,password} = req.body;

        // validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"Please Fill All Field"
            })
        }

        // user exist or not
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered",
            })
        }
        
        // matching password
        if(! await bcrypt.compare(password, user.password)){
             return res.status(401).json({
                success:false,
                message:"Incorrect Password"
            })
        }

        // if password matched
        else{
            // creating payload
            const payload = {
                email:user.email,
                id:user._id,
                role:user.role
            }

            let token = jwt.sign(payload,
                                 process.env.JWT_SECRET,
                                 {
                                    expiresIn:"3h"
                                 }
            )
            user = user.toObject()
            user.token = token
            user.password = undefined;

            // create a cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }

            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged in Successfully",
            })
        }

    } catch(error){
        console.log("Error while Login", error)
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// changePassword
exports.changePassword = async(req,res) => {
    // get data from req body
    // get currentpassword,newpassword,confirmNewPassword
    // Validation

    // hash password
    // update password in db
    // send mail password updated
    // return response
}
