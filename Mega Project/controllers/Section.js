const Section = require('../models/Section');
const Course = require('../models/Course');

// Creating Section
exports.createSection = async(req,res) => {
    try{
        // data fetch
        const {sectionName, courseId} = req.body;

        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:'Fill All Field'
            })
        }

        // create Section
        const newSectoin = await Section.create({sectionName});

        // update course with section ObjectID
        const updateCourse = await Course.findByIdAndUpdate(
                                    courseId,
                                    {
                                        $push:{
                                            courseContent:newSectoin._id
                                        }
                                    },
                                    {new:true}
                                )
        // TODO

        // return response
        return res.status(200).json({
            success:true,
            message:'Section Created Successfully',
            updateCourse
        })
    } catch(error){
        console.log("Error Occured while creating Section")
        return res.status(500).json({
            success:false,
            message:'Unable to create Section'
        })
    }
}

// Update Section
exports.updateSection = async(req,res) => {
    try{
        // fetch data from request body
        const {sectionName,sectionId} = req.body;

        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:'Fill All Field'
            })
        }

        // update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true})

        // return response
        return res.status(200).json({
            success:true,
            message:'Section Updated Successfully'
        })


    } catch(error){
        console.log("Error Occured while Updating Section")
        return res.status(500).json({
            success:false,
            message:'Unable to update Section'
        })
    }
}

// Delete Section
exports.deleteSection = async(req,res) => {
    try{
        // fetching id from parameter
        const {sectionId} = req.params
        
        // validation
        if(!sectionId){
            return res.status(400).json({
                success:false,
                message:'Invalid Url'
            })
        }
        // delete from database
        await Section.findOneAndDelete(sectionId);

        // return response
        res.status(200).json({
            success:true,
            message:"Section Deleted Successfully"
        })
    } catch(error){
        console.log("Error Occured while Deleting Section")
        return res.status(500).json({
            success:false,
            message:'Unable to Delete Section'
        })
    }
}