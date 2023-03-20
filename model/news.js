const mongoose=require("mongoose");
const News=mongoose.Schema({

    News_title:String,
    News_details:String,
    News_images:String,
    News_post_date:{
        type:Date,
        default:Date.now,
}
});


module.exports=mongoose.model("News",News);