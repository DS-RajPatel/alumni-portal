const mongoose=require("mongoose");
const events=mongoose.Schema({

    
        event_title:String,
        event_desc:String,
        event_schedule:String,
        event_program:String,
        event_post_date:{
                type:Date,
                default:Date.now
        }
        
    
});

 module.exports=mongoose.model("events",events);