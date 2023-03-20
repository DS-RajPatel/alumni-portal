const admin_model = require("../model/admin_info");
const program_model=require("../model/program")
const user_details_model=require("../model/user_details")
const event_model=require("../model/events")
const news_model=require("../model/news")
const jwt=require("jsonwebtoken");


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
        html:" <h1> Welcome to SRKI Alumni Portal </h1><p> hello Admin, "+ user +"You are Successfully Login in SRKI Alumni Portal </p>", // html body
      });

} catch (error) {
    console.log(error.message);
}
}

const admin_add = async(req,res)=>{
    try {

        const pass = req.body.password;
        const repass = req.body.repass;
        if (pass == repass) {
            try {
                const new_admin = new admin_model({
                    admin_name: req.body.name,
                    admin_email: req.body.email,
                    admin_program: req.body.program,
                    admin_mobile: req.body.mobile,
                    admin_pass: pass
                })
                const reg_pro = await new_admin.save();
                res.redirect('/admin_list');
            }
            catch (e) {
                console.log(e);
            }
        }
        else {
            res.status(201).render('admin/admin/new_admin', { info: "warning", msg: "Password not Match" });
        }
        
    } catch (error) {
        res.render("404")
    }
}


const check_data=async(req,res)=>{

try {

    
    const email = await req.body.email;
    const pass = await req.body.pass;

    if (email == "" || pass == "") {
        res.status(201).render('admin/admin_login', { msg: "Fill the blank" });
    }
    else {
        try {
            const admin_info = await admin_model.findOne({ admin_email: email })
            if (admin_info) {
                if (pass == admin_info.admin_pass) {
                    sendmail(email);
                        req.session.admin_data = admin_info._id;
                        console.log(req.session.admin_data);
                    res.redirect('/homes');
                }
                else {
                    res.status(201).render('admin/admin_login', { msg: "Check Authentication " });
                }
            }
            else {
                res.status(201).render('admin/admin_login', { msg: "Check Authentication " });
            }
        }
        catch (error) {
            res.status(201).render('admin/admin_login', { msg: "Check Authentication " });
        }
    }
    
} catch (error) {
    res.render("404")
}
}



const personal_info=async(req,res)=>{
   try {

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    const id=req.body.admin_id;
     const name=req.body.name;
     const email=req.body.email;
     const program=req.body.program;
     const mobile=req.body.mobile;
     const pass=req.body.pass;
 
     
     if (name==""||email==""||program==""||mobile==""||pass=="") {
         res.status(201).render('admin/admin/admin_pinfo', { info: "warning", msg: "Please Enter Valid Details"});
     }
     else {
         try {
             const up_data=await admin_model.findByIdAndUpdate({_id:id},{$set:{admin_name:name,admin_email:email,admin_program:program,admin_mobile:mobile,admin_pass:pass}})
            
             res.redirect("/homes")
         }
         catch (e) {
             console.log(e);
         }
     }
     

    
   } catch (error) {
    res.render("404")

   }
};

const admin_login=async(req,res)=>{
    res.render('admin/admin_login');
};

const admin_dashboard=async(req,res)=>{
 
    const alm = await user_details_model.find();
    const admin = await admin_model.find();
    const event = await event_model.find();
    const news = await news_model.find();
    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
      
        res.render('admin/admin_dashboard', { 
            data: data_tra , 
            alm:alm,
            admin:admin,
            event:event,
            news:news
        });
    }
}

const new_admin_get=async(req,res)=>{

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
    
    const program1 = await program_model.find()
    res.render('admin/admin/new_admin', {
        program1: program1,
        data: data_tra
    });
}
}

const personal_info_get=async(req,res)=>{

    
    const program1 = await program_model.find()
    const data_tra = await admin_model.findById({ _id: req.session.admin_data })

    if (data_tra == "") {
        res.status(201).render('admin/admin_dashboard', { msg: "Session Not Valid" });
    }
    else {

        res.render('admin/admin/admin_pinfo', {
            data: data_tra, program1: program1,
        },
        );
    }
}


const admin_list=async (req,res)=>{
    const data_tra = await admin_model.findById({ _id: req.session.admin_data })

    var search="";
    if(req.query.Search){
        search=req.query.Search;
    } 

    var page =1 ;
    if(req.query.page){
        page=req.query.page;
    }
    const limit=20;
    
    const admin_details = await admin_model.find({
        $or:[{ admin_name:{ $regex:'.*'+search+'.*',$options:'i'}},
        { admin_email:{ $regex:'.*'+search+'.*',$options:'i'}},
        { admin_program:{ $regex:'.*'+search+'.*',$options:'i'}}
    ]
    }).limit(limit*1)
    .skip((page - 1)*limit)
    .exec();
    const count = await admin_model.find().countDocuments();
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
    res.render('admin/admin/admin_list', {
        admin: admin_details,
        data: data_tra,
        totalpage:Math.ceil(count/limit),
        current_page:page
    });
    }

}

const admin_delete=async(req,res)=>{
    const user_detailsa = await user_details_model.find();

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.flash("message","sss")
        res.status(201).render('admin/admin_login', { message : "Session Not Valid" });
    }
    else {
    try{
    const id=req.query.id;
const pro_del=await admin_model.deleteOne({_id:id});
res.render('admin/admin_dashboard',{
    data:data_tra,
    user: user_detailsa,
})
 }
 catch{
    res.render('admin/admin/admin_list')
 }
}
}

const logout=async(req,res)=>{
    req.session.destroy();
    res.render('index');
}


module.exports={
    admin_add,
    check_data,
    personal_info,
    admin_login,
    admin_dashboard,
    new_admin_get,
    personal_info_get,
    admin_list,
    admin_delete,
    logout
}