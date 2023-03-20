
const event_model=require("../model/events");
const program_model=require("../model/program");
const admin_model = require("../model/admin_info");
const user_details_model=require("../model/user_details");

const event_add=async(req,res)=>{
    
    const data_tra = await admin_model.findById({ _id: req.session.admin_data })

    console.log(data_tra);
if (data_tra == "") {
    res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
}
else {
     
    const program = await program_model.find()
    res.render('admin/events/event_add', {
        program1: program,
        data: data_tra 
    });
}

}



const event_list=async(req,res)=>{

    var search="";
    if(req.query.Search){
        search=req.query.Search;
    } 

    var page =1 ;
    if(req.query.page){
        page=req.query.page;
    }
    const limit=20;


    const event_details = await event_model.find({
        event_title:{ $regex:'.*'+search+'.*',$options:'i'}

    }).limit(limit*1)
    .skip((page - 1)*limit)
    .exec();
    const count = await event_model.find().countDocuments();

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })
if (data_tra == "") {
    res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
}
else {
     
    res.render('admin/events/event_list', {
        event: event_details,
        data: data_tra,
        totalpage:Math.ceil(count/limit),
        current_page:page
    });
}
}


const event_delete=async(req,res)=>{
    const user_detailsa = await user_details_model.find();

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })


    if (data_tra == "") {
        res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
    }
    else {
    try{
    const id=req.query.id;
const del_event=await event_model.deleteOne({_id:id});
res.render('admin/admin_dashboard',{
    data:data_tra,
    user: user_detailsa,
})
 }
 catch{
    res.render('admin/events/event_list')
 }
}







}

const add_event=async (req,res)=>{
    const event_title = req.body.event;
    const event_desc = req.file.originalname;
    const event_schedule = req.body.EventSche;
    const program = req.body.program;
    

    if (event_title == "" || event_desc == "" || event_schedule == "") {
        res.status(201).render('admin/events/event_add', { info: "warning", msg: "Fill the blank" });
    }
    else {
        try {
            const new_event = new event_model({
                event_title: event_title,
                event_desc: req.file.filename,
                event_schedule: event_schedule,
                event_program: program,
            })
            const reg_pro = await new_event.save();
            res.redirect("/event_list")
        }
        catch (e) {
            console.log(e);
        }
    }
}






const edit_event_get=async(req,res)=>{

    const id=req.query.id;
    const event_details = await event_model.findById({_id:id});

    const data_tra = await admin_model.findById({ _id: req.session.admin_data })

if (data_tra == "") {
    res.status(201).render('admin/admin_login', { msg: "Session Not Valid" });
}
else {
    const program = await program_model.find()

    res.render('admin/events/edit_event', {
        event: event_details,
       data:data_tra,
        program1: program,
    });
}
}


const edit_event=async(req,res)=>{

try {
    const id=req.query.id;
    const eid=req.body.event_id;
    const event_title = req.body.event;
    const event_desc = req.file.originalname;
    const event_schedule = req.body.EventSche;
    const program = req.body.program;
    

    if (event_title == "" || event_desc == "" || event_schedule == "") {
        res.status(201).render('admin/events/event_add', { info: "warning", msg: "Fill the blank" });
    }
    else{
        try {
            
            const up_data=await event_model.findByIdAndUpdate({_id:eid},{$set:{event_title:event_title,event_desc:event_desc,event_schedule:event_schedule,event_program:program}})
            res.status(201).render('admin/admin_dashboard', { info: "success", msg: "Events Updated Successfully"});
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
event_add,
event_list,
event_delete,
add_event,
edit_event,
edit_event_get
}