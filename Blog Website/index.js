require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const dbConnect = require('./config/DataBase');
const router = require("./routes/Blog")

app.use(express.json());
app.use('/api/v1', router)

app.listen(PORT, () => console.log(`Server Running at Port no : ${PORT}`));
dbConnect();
app.get('/', (req,res) => res.send(`<h2>This is homepage</h2>`) )