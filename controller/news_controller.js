const news_model = require("../model/news");
const admin_model = require("../model/admin_info");
const user_details_model=require("../model/user_details")
const program_model=require("../model/news");



const news_add=async(req,res)=>{
    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
         
        res.render('admin/news/news_add',{
            data: data_tra 
        });
        
    }
}


const news_list=async(req,res)=>{
    var search="";
    if(req.query.Search){
        search=req.query.Search;
    } 

    var page =1 ;
    if(req.query.page){
        page=req.query.page;
    }
    const limit=10;

    const news_details = await news_model.find({
       $or:[{ News_title:{ $regex:'.*'+search+'.*',$options:'i'}},
       { News_details:{ $regex:'.*'+search+'.*',$options:'i'}}

    ]
    }).limit(limit*1)
    .skip((page - 1)*limit)
    .exec();
    const count = await news_model.find().countDocuments();


    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
         
    res.render('admin/news/news_list', {
        news: news_details,
        data:data_tra,
        totalpage:Math.ceil(count/limit),
        current_page:page
    });
}
}

const news_delete=async(req,res)=>{
    try {
        const user_detailsa = await user_details_model.find();

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
    try{
    const id=req.query.id;
const pro_del=await news_model.deleteOne({_id:id});
res.render('admin/admin_dashboard',{
    data:data_tra,
    user: user_detailsa,
})
 }
 catch{
    res.render('admin/events/news_list')
 }
}
        
    } catch (error) {
     res.render("404")
    }
}


const add_news =async(req,res)=>{
try {

    const News_title = req.body.News;
    const NewsDetails = req.body.NewsDetails;
    const Newsimages = req.file.originalname;


    if (News_title == "" || NewsDetails == ""||Newsimages=="") {
        res.status(201).render('admin/news/news_add', { info: "warning", msg: "Fill the blank" });
    }
    else {
        // add User details Here.
        try {
            const new_news = new news_model({
                News_title: News_title,
                News_details: NewsDetails,
                News_images: req.file.filename
            })
            const reg_pro = await new_news.save();
            res.redirect("/news_list")
        }
        catch (e) {
            console.log(e);
        }
    }
    
} catch (error) {
 res.render("404")
}
}


const edit_news_get=async(req,res)=>{

    const id=req.query.id;
    const news_details = await news_model.findById({_id:id});
    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
if (data_tra == "") {
    res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
}
else {
    const program = await program_model.find()

    res.render('admin/news/news_edit', {
        news: news_details,
        data: data_tra,
        program1: program,
    });
}
}

const edit_news=async(req,res)=>{

try {
    const id=req.query.id;
    const nid=req.body.nid;
    const News_title = req.body.event;
    const News_images = req.file.originalname;
    const News_details = req.body.EventSche;
   
    

    if (News_title == "" || News_images == "" || News_details == "") {
        res.status(201).render('admin/news/news_list', { info: "warning", msg: "Fill the blank" });
    }
    else{
        try {
            const up_data=await news_model.findByIdAndUpdate({_id:nid},{$set:{News_title:News_title,News_images:News_images,News_details:News_details}})
            res.status(201).render('admin/admin_dashboard', { info: "success", msg: "News Updated Successfully"});
        }
        catch (e) {
            console.log(e);
        }
    }

    
} catch (error) {
 res.render("404")
}

}

module.exports={
news_add,
news_list,
news_delete,
add_news,
edit_news_get,
edit_news
}