const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async(req,res) => {
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(() => console.log("DataBase Connected Sucessfully"))
    .catch((error) => console.log(error))
}

module.exports = dbConnect;