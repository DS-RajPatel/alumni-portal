const login=async (req,res,next)=>{
try{
    if(req.session.admin_data){
        
    }
    else{
        res.redirect("/admin")
    }
    next();

}
catch (error) {
    res.status(201).render('admin/admin_login', { msg : "" } );
}

}
const logout=async (req,res,next)=>{
    try{
        if(req.session.admin_data){
            res.redirect("/admin_dashboard")
        }
        else{
           
        }
        next();

    
    }
    catch (error) {
        res.status(201).render('admin/admin_login', { msg : "" } );
    }
    
    }
    module.exports={
        login,logout
    };


    