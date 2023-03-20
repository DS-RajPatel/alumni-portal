const jsConvert = require('js-convert-case');

// Exported Models
const program_model = require("../model/program");
const admin_model = require("../model/admin_info");
const user_details_model=require("../model/user_details")

const program=async(req,res)=>{

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
         
    res.render('admin/program/program',{
        data:data_tra
    });
    }
}

const program_list=async(req,res)=>{
    var search="";
    if(req.query.Search){
        search=req.query.Search;
    } 


    var page =1 ;
    if(req.query.page){
        page=req.query.page;
    }
    const limit=1;

    const program = await program_model.find({
        
    program_name:{ $regex:'.*'+search+'.*',$options:'i'}

    }).limit(limit*1)
    .skip((page - 1)*limit)
    .exec();
    const count = await program_model.find().countDocuments();


    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', {info:"danger", msg: "Session Not Valid" });
    }
    else {
    res.render('admin/program/program_list', {
        program1: program,
        data: data_tra,
        totalpage:Math.ceil(count/limit),
        current_page:page

});
    }

}

const program_delete=async(req,res)=>{

    const user_detailsa = await user_details_model.find();

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
    try{
    const id=req.query.id;
const pro_del=await program_model.deleteOne({_id:id});
res.render('admin/admin_dashboard',{
    data:data_tra,
    user: user_detailsa,
})
 }
 catch{
    res.render('admin/program/program_list')
 }
}

}


const add_program=async(req,res)=>{
try {
    var program1 =req.body.program
    const program = (jsConvert.toUpperCase(program1));
    if (program == "") {
        res.status(201).render('admin/program/program', { info: "danger", msg: "Please Enter Valid Programs " });
    }
    else {
        const program_info = await program_model.findOne({ program_name: program })
        if (program_info) {
            res.status(201).render('admin/program/program', { info: "danger", msg: "Already Added" });
        }
        else {
            try {
                const register_programs = new program_model({
                    program_name: program
                })
                const reg_pro = await register_programs.save();
                res.redirect('/program_list');
            }
            catch (e) {
                console.log(e);
            }
        }
    }

} catch (error) {
    
 res.render("404")

}


}

module.exports={
    program,
    program_list,
    program_delete,
    add_program
}