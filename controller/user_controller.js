// exported mongoose.models


const user_details_model=require("../model/user_details")
const program_model=require("../model/program")
const admin_model = require("../model/admin_info");
const alumni_model = require("../model/alumni_bio");
var cs=require("csvtojson");
const jsConvert = require('js-convert-case');
const new_user_get=async(req,res)=>{

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
        const program = await program_model.find()

    res.render('admin/user/new_user',{
        data:data_tra,
        program1: program
    
    });
}
}

const new_user=async(req,res)=>{

      
    try {

        const userdata=[];
    cs()
    
    .fromFile(req.file.path)
    .then(async(response)=>{
      
        for (let j = 0; j < response.length; j++) {
          
            const program = (jsConvert.toUpperCase(response[j].Program));
            
            userdata.push({
               
            user_email:response[j].Email,
            user_enroll:response[j].Enroll,
            
            user_program:program,
            user_password:response[j].Password
                
            })  
            
            await user_details_model.insertMany(userdata);
        }

        })
        res.redirect('/user_list')

} catch (error) {
    res.render("admin/admin_dashboard")
}

}

const user_list=async(req,res)=>{

    var search="";
    if(req.query.Search){
        search=req.query.Search;
    } 


    var page =1 ;
    if(req.query.page){
        page=req.query.page;
    }
    const limit=10;

    const user_detailsa = await user_details_model.find({
        $or:[{ user_email:{ $regex:'.*'+search+'.*',$options:'i'}},
        { user_enroll:{ $regex:'.*'+search+'.*',$options:'i'}}
        ]
    }).limit(limit*1)
    .skip((page - 1)*limit)
    .exec();
    const count = await user_details_model.find().countDocuments();

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
    res.render('admin/user/user_list', {
        user: user_detailsa,
        data:data_tra,
        totalpage:Math.ceil(count/limit),
        current_page:page
    });
}

}

const personal_details=async(req,res)=>{
    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
        var search="";
        if(req.query.Search){
            search=req.query.Search;
        } 
    
        var page =1 ;
    if(req.query.page){
        page=req.query.page;
    }
    const limit=10;

        const alm = await alumni_model.find({
            $or:[{ alm_name:{ $regex:'.*'+search+'.*',$options:'i'}},
            { alm_email:{ $regex:'.*'+search+'.*',$options:'i'}},
            { alm_contact_no:{ $regex:'.*'+search+'.*',$options:'i'}},
            { alm_current_location:{ $regex:'.*'+search+'.*',$options:'i'}},
            { alummi_batch:{ $regex:'.*'+search+'.*',$options:'i'}}
            ]
        }).limit(limit*1)
        .skip((page - 1)*limit)
        .exec();
        const count = await alumni_model.find().countDocuments();
    
    res.render('admin/user/personal_details',{
        data:data_tra,
        alm:alm,
        totalpage:Math.ceil(count/limit),
        current_page:page
    });}
}

const delete_user=async(req,res)=>{
    const user_detailsa = await user_details_model.find();

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })

    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
         

    try{

    const id=req.query.id;
const user_edit=await user_details_model.deleteOne({_id:id});
res.redirect("/homes")
 }
 catch{
    res.render('admin/user/user_list')
 }
}
}



const user_new = async(req,res)=>{

    const email=req.body.email;
    try {
            try {
                const new_user = new user_details_model({
                    user_email: email,
                    user_enroll: req.body.Enroll,
                    user_program: req.body.program,
                    user_password: req.body.password
                })
                const reg_pro = await new_user.save();
                res.redirect('/user_list');
            }
            catch (e) {
                console.log(e);
            }
        }
      
        
    catch (error) {
         res.render("404")
    }
}


module.exports={
    new_user_get,new_user,user_list,personal_details,delete_user,user_new
}