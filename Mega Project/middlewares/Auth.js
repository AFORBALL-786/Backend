require('dotenv').config()

const jwt = require('jsonwebtoken');

// authenication
exports.auth = async(req,res,next) => {
    try{
        // extract token
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace('Bearer ',"");

        // if token missing
        if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is Missing",
            })
        }

        // verify the token
        try {
            const decode = jwt.verify(token,process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        } 
        catch(error){
            // verification issue
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        next();

    } catch(error){
        console.log("Error Occured while Validating Token")
        return res.status(401).json({
            success:false,
            message:error.message
        })
    }       
}

// isStudent
exports.isStudent = async(req,res,next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for student"
            })
        }
        next();
    } catch (error) {
        console.log("Error Occured while validating student as a role", error)
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}

// isInstructor
exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.role !== "Instructor"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Instructor"
            })
        }
        next();
    } catch (error) {
        console.log("Error Occured while validating Instructor as a role", error)
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}

// isAdmin
exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin"
            })
        }
        next();
    } catch (error) {
        console.log("Error Occured while validating Admin as a role", error)
        return res.status(500).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
}