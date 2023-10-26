const User = require('../model/userData');

exports.getDetail = async(req,res) => {
    try{
        // fetching id from request
        let id = req.user.id
        
        const userDetail = await User.findById(id);
        userDetail.password = undefined;
        console.log(userDetail);

        res.status(200).json({
            success:true,
            userDetail:userDetail,
            message:"User Info Fetched Successfully"
        })
    } catch(error){
        res.status(500).json({
            success:false,
            error:error.message,
            message:"Can't be retrieved user detail"
        })
    }
}