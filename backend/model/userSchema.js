const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ],

   
});

var salt = bcrypt.genSaltSync(10);

userSchema.pre('save',async function (next) {
 if(this.isModified("password")){
    this.password = bcrypt.hashSync(this.password,salt);
 }
 next();
});
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token; 
    }catch(err){
        console.log(err);
    }
}
const User = mongoose.model("USER", userSchema);

module.exports = User;  