require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000
const dbConnect = require('./config/database')
const router = require('./routes/login-signup');

app.use(express.json());
app.use('/api/v1', router)

app.listen(PORT, () => console.log(`Server is running at ${PORT} Sucessfully`));
dbConnect();
app.get('/', (req,res) => res.send(`<h1>This is Homepage!!</h1>`))
