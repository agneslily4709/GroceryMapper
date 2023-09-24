const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const app = express();
dotenv.config({path:"./.env"});

require('./db/conn');
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use('/api',require('./router/auth'));

const PORT = process.env.PORT || 5000;
app.get('/login',(req,res)=>{
    res.send(`Hello signin`);
});

app.get('/signup',(req,res)=>{
    res.send(`Hello signup`);
});
app.get('/',(req,res)=>{
    res.send(`Hello home`);
})
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});