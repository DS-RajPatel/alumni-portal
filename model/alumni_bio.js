const mongoose=require("mongoose");
const alm_bio=mongoose.Schema({

    alm_avatar:{
        type:String,
    },
    alm_name:{
        type:String
    },

    alm_email:{
        type:String,
       
    },
    alm_contact_no:{
        type:String,
    },
    
    alummi_batch:{
        type:String,
    },
    alm_current_location:{
        type:String,
    },
    alm_current_jobprofile:{
        type:String,
    },
   
    alm_insta_id:{
        type:String
    },
     alm_git_id:{
        type:String
    },

});
module.exports=mongoose.model("alm_bio",alm_bio);



