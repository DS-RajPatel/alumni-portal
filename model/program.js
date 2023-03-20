const mongoose=require("mongoose");
const program=mongoose.Schema({
    program_name:{
        type:String,
        unique : true
    }
})
module.exports=mongoose.model("program",program);