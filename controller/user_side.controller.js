const user_details_model = require("../model/user_details")
const event_model = require("../model/events");
const news_model = require("../model/news");
const alumni_post_model = require("../model/alumni_post");
const alumni_bio_model=require("../model/alumni_bio");

const mail=require("nodemailer");
const sendmail=async(user)=>{
try {
  const transporter= mail.createTransport({
        host: "smtp.@gmail.com",
        port:465,
        service:"gmail",
        auth: {
            user: 'rajpatepatel1849@gmail.com',
            pass: 'lqawjbtigdcajulm'
        }
    })

    let info = await transporter.sendMail({
        from: '<srki@gmail.com>', // sender address
        to: user, // list of receivers
        subject: "Login to Alumni Portal", // Subject line   
        html: "<h1> Welcome to SRKI Alumni Portal </h1></br><b>Hello Student</b> <p> You are Successfully Login in SRKI Alumni Portal </p>", // html body
      });

} catch (error) {
    console.log(error.message);
}
}


const user_login = async (req, res) => {

    res.render("users/login")

}

const event_list = async function (req, res) {

    const data_tra = await user_details_model.findById({ _id: req.session.user_data })
    var page =1 ;
    if(req.query.page){
        page=req.query.page;
    }
    const limit=9;

    const event1 = await event_model.find({ event_program: data_tra.user_program })
    .limit(limit*1)
    .skip((page - 1)*limit)
    .exec();

    const count = await event_model.find({ event_program: data_tra.user_program }).countDocuments();
    res.render("users/event", {
        event: event1,
        totalpage:Math.ceil(count/limit),
        current_page:page
    });
}


const authentication = async (req, res) => {


    try {
        const user = req.body.user;
        const pass = req.body.pass;
        try {
            const user_info = await user_details_model.findOne({ user_email: user })

            if (user_info) {
                if (user_info.user_password == pass) {
                    sendmail(user);
                    req.session.user_data = user_info._id;
                    res.redirect('/home');
                }
                else {
                    res.status(201).render('users/login', { msg: "Check Authentication " });
                }
            }
            else {

                res.status(201).render('users/login', { msg: "Check Authentication " });
            }

        } catch (error) {

            res.status(201).render('users/login', { msg: "Check Authentication " });
        }


    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message })
    }

}
const homepage = async (req, res) => {
    try {
       
        var page =1 ;
        if(req.query.page){
            page=req.query.page;
        }
        const limit=5;
    

        const news = await news_model.find().limit(limit*1)
        .skip((page - 1)*limit)
        .exec();

        const count = await news_model.find().countDocuments();
        res.render("users/home", {
            news: news,
            totalpage:Math.ceil(count/limit),
            current_page:page
        });

    } catch (error) {

        res.send("error")

    }

}

const contact = async (req, res) => {
    res.render("users/contact")
}

const profile = async (req, res) => {

    try {
        const data_tra = await user_details_model.findById({ _id: req.session.user_data })
        res.render('users/profile', {
            data: data_tra
        });

    } catch (error) {

    }

}
const community = async (req, res) => {
    const data_tra = await user_details_model.findById({ _id: req.session.user_data })

 
    var page =1 ;
    if(req.query.page){
        page=req.query.page;
    }
    const limit=12;


    const alm = await alumni_post_model.find().limit(limit*1)
    .skip((page - 1)*limit)
    .exec();

    const count = await alumni_post_model.find().countDocuments();
    res.render('users/community',{
        data:data_tra,
        alm:alm,
        totalpage:Math.ceil(count/limit),
        current_page:page
    });
}
const index = async (req, res) => {
    res.render('index');
}
const logout = async (req, res) => {
    req.session.destroy();
    res.render('index');
}


const personal_info = async (req, res) => {
    try {

        const data_tra = await user_details_model.findById({ _id: req.session.user_data })
        const uid = req.body.uid;
        const email = req.body.email;
        const pass = req.body.password;

        const news = await news_model.find()

        try {
            const up_data = await user_details_model.findByIdAndUpdate({ _id: uid }, { $set: { user_email: email, user_password: pass } })
            res.status(201).render('users/home',{
                news:news
            });
        }
        catch (e) {
            console.log(e);
        }
    }



    catch (error) {
        res.send({ status: 400, success: false, msg: error.message })

    }
}


const personalinfo_get=async(req,res)=>{

    
   
    const data_tra = await user_details_model.findById({ _id: req.session.user_data })

    if (data_tra == "") {
        res.status(201).render('admin/admin_dashboard', { msg: "Session Not Valid" });
    }
    else {

        res.render('users/profile', {
            data: data_tra
        },
        );
    }
}

const add_info=async(req,res)=>{

    
    const data_tra = await user_details_model.findById({ _id: req.session.user_data })

   
    try {

        const email = req.body.email;
        const desc = req.body.description;
        
        const desc_file = req.file.originalname;
      
           
                const new_post = new alumni_post_model({

                    alm_email:email,
                    alm_post_desc:desc,
                    
                    alm_info:req.file.filename,
                   
                })
                const reg_pro = await new_post.save();
                res.redirect('/community');
            }
           
     
        
     catch (error) {
         res.render("404")
    }


}

const alumni_bio=async(req,res)=>{
    var page =1 ;
    if(req.query.page){
        page=req.query.page;
    }
    const limit=12;
    
    const alm = await alumni_bio_model.find().limit(limit*1)
    .skip((page - 1)*limit)
    .exec();
    const count = await alumni_bio_model.find().countDocuments();
 

res.render("users/alumni_bio_list",{

    alm:alm,
    totalpage:Math.ceil(count/limit),
    current_page:page
})



}

const alumni_bio_up=async(req,res)=>{

    try {
        const data_tra = await user_details_model.findById({ _id: req.session.user_data })
        const alm = await alumni_bio_model.find()

       const id=req.body.id;
    
        const name=req.body.name;
        const email=req.body.email;
        const contact_no=req.body.contact;
        const alummi_batch=req.body.batch;
        const alm_current_location=req.body.Current_Location;
        const alm_current_jobprofile=req.body.Current_jobprofile;
      
         const insta= req.body.Insta_id;
         
        const git= req.body.Git_id;

        if(req.file){

            const up_data=await alumni_bio_model.findByIdAndUpdate({_id:id},{$set:{alm_avatar:req.file.filename,alm_name:name,alm_email:email,alm_contact_no:contact_no,alummi_batch:alummi_batch,alm_current_location:alm_current_location,alm_current_jobprofile:alm_current_jobprofile,alm_insta_id:insta,alm_git_id:git}})
            
            res.redirect("/alumni_bio");
       }
        
        else{

        const up_data=await alumni_bio_model.findByIdAndUpdate({_id:id},{$set:{alm_name:name,alm_email:email,alm_contact_no:contact_no,alummi_batch:alummi_batch,alm_current_location:alm_current_location,alm_current_jobprofile:alm_current_jobprofile,alm_insta_id:insta,alm_git_id:git}})
        res.redirect("/alumni_bio");


        }
    
    


    } catch (error) {
     res.render("404")
    }

}
const alumni_bio_up_get=async(req,res)=>{
    const data_tra = await user_details_model.findById({ _id: req.session.user_data })
    const USER = await user_details_model.findById({ _id: req.session.user_data})
    console.log();
    const alm = await alumni_bio_model.findOne({ alm_email: USER.user_email})

   if(alm){

    res.render("users/alumni_bio",{
        data:data_tra,
        alm:alm
    })
}
else{
    res.render("users/alumni_new",{
        data:data_tra,
    });
}
}

const alumni_bio_new=async(req,res)=>{

    try {
        const data_tra = await user_details_model.findById({ _id: req.session.user_data })


       
        const avtar = req.file.originalname;
        const email=req.body.email;
        const contact_no=req.body.contact;
        const alummi_batch=req.body.batch;
        const alm_current_location=req.body.Current_Location;
        const alm_current_jobprofile=req.body.Current_jobprofile;
      
         const insta= "https://www.instagram.com/"+req.body.Insta_id;
         
        const git="https://github.com/"+req.body.Git_id;

        const alm_info = new alumni_bio_model({
            alm_avatar:req.file.filename,
            alm_email:email,
            alm_contact_no:contact_no,
            alummi_batch:alummi_batch,
            alm_current_location:alm_current_location,
            alm_current_jobprofile:alm_current_jobprofile,
            alm_insta_id:insta,
            alm_git_id:git

   
        })
        const alumni_info = await alm_info.save();
     
        res.redirect("alumni_bio")



    } catch (error) {
        res.send({status:400,success:false,msg:error.message})
    }

}

module.exports = {
    user_login,
    event_list,
    authentication,
    homepage,
    contact,
    profile,
    community,
    index,
    logout,
    personal_info,
    personalinfo_get,
    add_info,
    alumni_bio,
    alumni_bio_up,
    alumni_bio_up_get,alumni_bio_new
}