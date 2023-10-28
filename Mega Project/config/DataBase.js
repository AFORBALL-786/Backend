require('dotenv').config();
const mongoose = require('mongoose');

const dbConnect = () => {
    try{
        mongoose.connect(process.env.DB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        .then(console.log("DataBase Connected Successfully"));
    } catch(error){
        console.log(("DataBase Couldn't Connected")),
        console.error(error),
        process.exit(1)  
    }
}

module.exports = dbConnect();