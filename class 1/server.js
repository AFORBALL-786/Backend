// Server Instantiate
const express = require("express");
const app = express();

// used to parse req.body in express -> PUT or POST
const bodyParser = require('body-parser');

// specifically parse JSON data and add it to the request/Body object
app.use(bodyParser.json());

// active the server on port no : 3000
app.listen(3000, () => {
    console.log("Server Started at port no : 3000");
});

// Defined Routes for get and post request
app.get( '/' , (req,res) => {
    res.send("Hello World");
});

app.post('/api/cars', (req,res) => {
    const {name,brand} = req.body;
    console.log(name);
    console.log(brand);
    res.send("Car Submitted Sucessfully");
});

// connecting mongobd with node
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/myDatabase', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(() => { console.log("Connection Succesfully")})
.catch((error) => {console.log("Error Occured",error)})