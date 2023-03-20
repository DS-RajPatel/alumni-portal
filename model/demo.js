const mongoose=require("mongoose");
const demo=mongoose.Schema({

    
    person_id:{
        type:String
                },
    person_name:{
        type:String,
    }

})
module.exports=mongoose.model("demo",demo);