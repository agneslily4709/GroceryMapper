const mongoose = require("mongoose");

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

const Grocery = mongoose.model("GROCERY",groceryScheme);

module.exports = Grocery