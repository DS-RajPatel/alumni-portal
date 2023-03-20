const user_details_model = require("../model/user_details")
const admin_model = require("../model/admin_info");
const mail=require("nodemailer");


const forgot_admin=async(dbemail,dbpass,dbname)=>{
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
            to: dbemail, // list of receivers
            subject: "Alumni Portal", // Subject line   
            html:" <h1> Welcome to SRKI Alumni Portal </h1><p> hello Admin, "+ dbname +"<br>     Your Email Is "+dbemail+" <br> Your Password Is "+dbpass+"</p>", // html body
          });
    
    } catch (error) {
        console.log(error.message);
    }
    }
    const forgot_user=async(dbemail,dbpass,dbname)=>{
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
                to: dbemail, // list of receivers
                subject: "Alumni Portal", // Subject line   
                html:" <h1> Welcome to SRKI Alumni Portal </h1><p> hello <br> Your Email Is :-  "+dbemail+" <br> Your Password Is :-  "+dbpass+"</p>", // html body
              });
        
        } catch (error) {
            console.log(error.message);
        }
        }
    
    const Forgeturl=async(req,res)=>{
        res.render("forget")
    };

    const Forgot_pass=async(req,res)=>{

        try {
        
            
            const email = await req.body.email;
          
        
            if (email == "") {
                res.status(201).render('admin/admin_login', { msg: "Fill the blank" });
            }
            else {
                try {
                  
                    const admin_info = await admin_model.findOne({ admin_email: email })
                   
                    if (admin_info) 
                
                        {
                           
                            dbemail=admin_info.admin_email
                           dbname= admin_info.admin_name
                            dbpass=admin_info.admin_pass
                            forgot_admin(dbemail,dbpass,dbname);  
                            
                            res.status(201).render('forget', { msg1: "Please Check Your Mail" });
                       
                        }
                   else{
                    const user_info = await user_details_model.findOne({ user_email: email })
                     if(user_info){
                        console.log(user_info);
                        dbemail=user_info.user_email
                        dbpass=user_info.user_password
                        forgot(dbemail,dbpass);
                        console.log("send");
                     
                        res.status(201).render('forget', { msg1: "Please Check Your Mail" });
                     
                    }
                    else{
                        console.log(error);
                        res.status(201).render('forget', { msg: "You Are Not Register In Alumni Portal " });
                    }
                }
                }
                catch (error) {
                    res.status(201).render('forget', { msg: "You Are Not Register In Alumni Portal " });
                }
            }
            
        } catch (error) {
            res.render("404")
        }
        }
        
        
        module.exports={
            Forgot_pass,
            Forgeturl};