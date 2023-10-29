const SubSection = require('../models/SubSection');
const {imageUploader} = require('../utils/ImageUploader');
const Section = require('../models/Section');

// create subsection
exports.createSubSection = async(req,res) => {
    try{
        // fetch data from request body
        const {sectionId, title, timeDuration,description} = req.body;

        // extract file/vide
        const video = req.files.videoFile;

        // validation
        if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:'All Fields are required'
            })
        }

        // upload video to cloudinary
        const uploadDetail = await imageUploader(video);

        // create a sub section
        const subSectionDetail = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetail.secure_url
        })

        // update section with this subsection ObjectId
        const updateSection = await Section.findByIdAndUpdate(sectionId,
                {
                    $push:{
                        subSection:subSectionDetail._id
                    }
                },
                {new:true}
            ).populate("subSection")

        console.log(updateSection);

        // return response
        return res.status(200).json({
            success:true,
            message:'Sub Section Created Successfully'
        })
    } catch(error){
        console.log("Error Occured while Creating Sub-Section")
        return res.status(500).json({
            success:false,
            message:'Unable to Create Sub-Section'
        })
    }
}

// TODO : update SubSection
// TODO : delete SubSection