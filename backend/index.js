import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors"
import mongoose from "mongoose";
import router from "./router/Router.js";
const app = express();


dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use('/api',router);

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
const DB = process.env.DB_CONNECTION;
mongoose.connect(DB,{
   useNewUrlParser:true,
   useUnifiedTopology:true,
}).then(()=>{
   console.log(`DB connected`);
}).catch((err)=>console.log(`not connected `));