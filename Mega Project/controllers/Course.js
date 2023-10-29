const Course = require('../models/Course');
const Tag = require('../models/Tags');
const User = require('../models/User');
const {imageUploader} = require('../utils/ImageUploader');

// Create Course 
exports.createCourse = async (req,res) => {
    try{    

        // fetch all data 
        const {courseName, courseDescription, whatYouWillLearn, price, tag} = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).json({
                success: false,
                message:"All fields are required"
            })
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details",instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor Details not found"
            })
        }

        // tags is valid or not
        const tagDetails = Tag.findById(tag)
        if(!tagDetails){
            return res.status(404).json({
                success:false,
                message:"Tag Details not found",
            })
        }

        // upload Image to cloudinary
        const thumbnailImage = await imageUploader(thumbnail);

        // create an entry for new course
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url
        })

        // add the new course to the instructor user schema
        await User.findByIdAndUpdate(
            {_id:instructorDetails.id},
            {
                $push:{
                    courses : newCourse._id,

                }
            },
            {new:true}
        );

        // update the tag schema
        await Tag.findByIdAndUpdate(
            {_id:tagDetails.id},
            {
                $push:{
                    course:newCourse._id
                }
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            date:newCourse,
        });

    } catch (error){
        console.log("Error Occured while creating new course", error);
        return res.status(500).json({
            success:false,
            message:"Failed to create New Course",
            error:error.message
        })
    }
}

// Read All Course
exports.showAllCourses = async (req,res) => {
    try{
        const allCourse = await Course.find({}, {
                                                    courseDescription:true,
                                                    courseName:true,
                                                    price:true,
                                                    thumbnail:true,
                                                    instructor:true,
                                                    ratingAndReview:true,
                                                    studentEnrolled:true }).populate("instructor").exec();
        
        // return response
        return res.status(200).json({
            success:true,
            message:"All Courses fetched Successfully",
            data:allCourse,
        })

    } catch(error) {
        console.log("Error Occured while Reading all courses", error);
        return res.status(500).json({
            success:false,
            message:"Failed to read all Courses",
            error:error.message
        })
    }
}