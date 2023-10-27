const express = require("express");
const router = express.Router();

// import Controller
const {localFileUpload} = require('../controller/LocalFileUpload');
const {uploadImage} = require('../controller/UploadImage');
const {uploadVideo} = require('../controller/VideoUpload');
const {imageSizeReducer} = require('../controller/ImageSizeReducer');

// mapping
router.post('/localfileupload', localFileUpload);
router.post('/uploadimage', uploadImage);
router.post('/videoupload', uploadVideo);
router.post('/imagesizereduce', imageSizeReducer);

// export
module.exports = router;