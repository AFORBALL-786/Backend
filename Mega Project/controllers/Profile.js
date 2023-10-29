const Profile = require('../models/Profile')
const User = require('../models/User')

// update profile its object already created
exports.updateProfile = async(req,res) => {
    try{
        // get data from request body
        const {dob="", about="", phoneNumber, gender} = req.body;

        // get userId
        const id = req.user.id;

        // validation
        if(!phoneNumber || !gender){
            return res.status(400).json({
                success:false,
                message:'All fields are required'
            })
        }

        // find profile
        const userDetail = await User.findById(id);
        const profileId = userDetail.addtionalDetail;
        const profileDetails = await Profile.findById(profileId);

        // update profile
        profileDetails.dob = dob;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.phoneNumber = phoneNumber;
        await profileDetails.save();

        // return response
        return res.status(200).json({
            success:true,
            message:"Profile Updated Successfully",
            profileDetails
        })
    } catch(error){
        console.log("Error Occured while Updating Profile")
        return res.status(500).json({
            success:false,
            message:'Unable to Update Profile'
        })
    }
}

// delete profile
exports.deleteProfile = async(req,res) => {
    try{
        // get id
        const id = req.user.id;

        // validation
        const userDetail = await User.findById(id);
        if(!userDetail){
            return res.status(404).json({
                success:false,
                message:'User not Found',
            });
        }

        // delete profile
        await Profile.findByIdAndDelete({_id:userDetail.addtionalDetail})
        // TODO : unenroll user form all enrolled courses
        
        // delete user
        await User.findByIdAndDelete({_id:id})

        // return response
        return res.status(200).json({
            success:true,
            message:'User Deleted Successfully'
        })

    } catch(error){
        console.log("Error Occured while Deleting Account")
        return res.status(500).json({
            success:false,
            message:'Unable to Delete Profile'
        })
    }
}

// get all user Detail
exports.getAllUserDetails = async(req,res) => {
    try{
        // get id
        const id = req.user.id;

        // validation
        const userDetails = await User.findById(id).populate("addtionalDetails").exec();

        // return response
        return res.status(200).json({
            success:true,
            message:'User Data Fetched Successfully'
        });

    } catch(error){
        console.log("Error Occured while Fetching All User Detail")
        return res.status(500).json({
            success:false,
            message:'Unable to Fetched All User Detail'
        })
    }
}