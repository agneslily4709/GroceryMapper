const mongoose = require("mongoose");

const DB = process.env.DB_CONNECTION;
mongoose.connect(DB,{
   useNewUrlParser:true,
   useUnifiedTopology:true,
}).then(()=>{
   console.log(`DB connected`);
}).catch((err)=>console.log(`not connected `));