require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const dbConnect = require('./config/DataBase');
const cloudinary = require('./config/Cloudinary');
const router = require('./route/File');
const fileupload = require('express-fileupload');

// middleware
app.use(express.json());
app.use(fileupload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use('/api/v1/upload', router);

app.listen(PORT, console.log(`Server is running at port no ${PORT}`));
dbConnect();
cloudinary();
app.get('/', (req,res) => res.send(`<h1>This is HomePage</h1>`));