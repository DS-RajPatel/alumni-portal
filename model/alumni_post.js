const mongoose=require("mongoose");
const alm_post=mongoose.Schema({

    alm_email:{
        type:String,
    },
    alm_post_desc:{
        type:String,
    },
    alm_image:{
        type:String,
    },
    alm_info:{
        type:String,
    },
    alm_post_date:{
        type:Date,
        default:Date.now
    }   
    });
module.exports=mongoose.model("alm_post",alm_post);



