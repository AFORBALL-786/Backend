const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = () => {
    try{
        mongoose.connect(process.env.DB_URL, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        })
        console.log("DataBase Connected Successfully")
    } catch(error){
        console.log("DataBase Can't be Connected");
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = dbConnect;