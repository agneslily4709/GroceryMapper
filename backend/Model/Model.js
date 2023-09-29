import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

const groceryScheme = new mongoose.Schema({
    item:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    icon:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true    
    }


})

export const Grocery = mongoose.model("GROCERY",groceryScheme);

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
export const User = mongoose.model("USER", userSchema);
