const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})
// a function -> to send mail
async function sendVerification(email,otp){
    try{
        const mailResponse = await mailSender(email,"verification Email from StudyNotion", otp)
        console.log("Email sent Successfully", mailResponse)
    } catch(error) {
        console.log("Error while Sending Mail",error)
        throw error;
    }
}

OTPSchema.pre('save', async function(next) {
    await sendVerification(this.email, this.otp);
    next();
})


module.exports = mongoose.model('OTP', OTPSchema);