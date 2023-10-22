require("dotenv").config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const dbConnect = require("./config/database");
const todoRoute = require('./routes/todoRoute')

app.use(express.json());

// mount route
app.use('/api/v1', todoRoute)


// server start
app.listen(PORT, () => console.log(`Server Started sucessfully at ${PORT}`))

// Database Connection
dbConnect();

// / default route
app.get("/", (req,res) => {
    res.send("This is HomePage!!!");
})