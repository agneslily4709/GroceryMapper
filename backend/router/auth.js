const express = require("express");
const router = express.Router();
require('../db/conn');
const User = require("../model/userSchema");
const Grocery  = require("../model/grocerySchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("../middleware/Authenticate");

router.get('/',async (req,res)=>{
    res.send(`Hello backend from router`);
});

router.post('/signup',async (req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email | !password){
        return res.status(422).json({error:"Fill all fields"})
    }
    try{
        const userExist = await User.findOne({email:email})
        if(userExist){
            return res.status(422).json({error:"User already exist"})
        }else{
            const user = new User({name,email,password});
            await user.save();
            res.status(201).json({message:"User created successfully"});
        }
    }catch(err){
        console.log(err);
    }
   });

router.post('/login',async (req,res)=>{
    try{
       const {email,password} = req.body;
       if(!email || !password){
           return res.status(400).json({error:"Fill all fields"})
       }
         const userLogin = await User.findOne({email:email});            
         if(userLogin){
                const isMatch = await bcrypt.compare(password,userLogin.password);
                    if(!isMatch){
                        res.status(400).json({error:"Invalid credentials"});
                    }else{
                        const token =await userLogin.generateAuthToken();                       
                        res.cookie('jwtoken', token, {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 3600000)
                                });
                        res.status(200).json({message:"signin success"});
            }
            }else{
                res.status(400).json({error:"Invalid credentials"});
            }
    }catch(err){
        console.log(err);
    }
});

router.get('/getItems',async(req,res) => {
    try {
        const postMessages = await Grocery.find();    
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
})  

router.get('/logout', (req, res) => {
        res.clearCookie('jwtoken', {
            path: '/',
            domain: 'https://grocery-mapper-be.onrender.com/api' 
        });
        res.status(200).send('userLogout');
    }); 
      
//       async function insertSampleData() {
//         try {
//           await Grocery.insertMany(sampleGroceries);
//         } catch (error) {
//           console.error("Error inserting sample data:", error);
//         }
//       }
//       insertSampleData()
router.get('/profile',authenticate,(req,res)=>{
    res.send(req.rootUser);
});

module.exports = router;