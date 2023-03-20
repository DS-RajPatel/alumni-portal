const mongoose=require("mongoose");
const admin=mongoose.Schema({

    
    admin_name:{
        type:String
                },
    admin_email:{
        type:String,
        unique : true
    },
    admin_program:{
        type:String,
    },
    admin_mobile:{
        type:String,
    },
    admin_pass:{
        type:String,
    }
})
module.exports=mongoose.model("admin",admin);