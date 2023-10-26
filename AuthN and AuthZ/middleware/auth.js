const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = (req,res,next) => {
    try{
        // extract jwt token
        const {token} = req.body;
        if(!token){
            res.status(400).json({
                success:false,
                message:"Token Missing"
            })
        }
        // verify the token
        try{
            const decode = jwt.verify(token,process.env.JWT_SECRET_KEY);
            console.log(decode);

            req.user = decode;
        } catch(error){
            return res.status(401).json({
                success:false,
                message:"Invalid Token"
            })
        }
        next();

    } catch(error){
        return res.status(401).json({
            success:false,
            message:"Something is went wrong"
        })
    }
}