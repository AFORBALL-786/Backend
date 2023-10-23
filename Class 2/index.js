require('dotenv').config();

// initiate express and app
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000 
const dbConnect = require("./config/dataBase");
const router = require("./route/TodoRoute");

app.use(express.json());

app.use('/api/v1', router);


app.listen(PORT,() => console.log(`Server is running at port no : ${PORT}`))
dbConnect();
// default route
app.get('/',(req,res) => res.send("This is Homepage!!"));


