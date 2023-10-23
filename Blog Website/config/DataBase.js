const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async(req,res) => {
    try{
        mongoose.connect(process.env.DB_URL, {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        })
        .then(() => console.log("DataBase Connected Sucessfully"))
    } catch(error){
        console.log(error);
        console.error(error.message)
        process.exit(1);
    }

}

module.exports = dbConnect;