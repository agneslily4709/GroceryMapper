import jwt from "jsonwebtoken"
import {User} from "../Model/Model.js";

const Authenticate =async (req,res,next)=>{
    try{
        const token  = req.cookies.jwtoken;
        const verrifyToken = jwt.verify(token,process.env.SECRET_KEY);
        const rootUser = await User.findOne({_id:verrifyToken._id,"tokens.token":token});
        if(!rootUser){
            throw new Error("User not found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.rootUserId = rootUser._id;
        next();
    }catch(err){
        res.status(401).send("Unauthorized");
        console.log(err);
    }
}
export default Authenticate