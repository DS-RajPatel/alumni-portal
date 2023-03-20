const mongoose=require("mongoose");
const users=mongoose.Schema({

    
    user_email:{
        type:String,
        unique : true
    },

    user_enroll:{
        type:String,
        unique : true

    },
    user_program:{
        type:String
    },
    user_password:{
        type:String,
    }
});

module.exports=mongoose.model("users",users);