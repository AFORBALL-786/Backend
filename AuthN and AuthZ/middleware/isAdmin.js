
exports.isAdmin = (req,res,next) => {
    try{
        if(req.user.role !== "Admin"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for Admin"
            })
        }
        next();
    } catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}