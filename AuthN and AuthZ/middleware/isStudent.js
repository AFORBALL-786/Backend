
exports.isStudent = (req,res,next) => {
    try{
        if(req.user.role !== "Student"){
            return res.status(401).json({
                success:false,
                message:"This is a protected route for student"
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