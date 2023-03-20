const user_login=async (req,res,next)=>{
    try{
        if(req.session.user_data){
            
        }
        else{
            res.redirect("/login")
        }
        next();
    
    }
    catch (error) {
        res.status(201).render('index', { msg : "" } );
    }
    
    }
    const user_logout=async (req,res,next)=>{
        try{
            if(req.session.user_data){
                res.redirect("/home")
            }
            else{
               
            }
            next();
    
        
        }
        catch (error) {
            res.status(201).render('users/user_login', { msg : "" } );
        }
        
        }
        module.exports={
            user_login,user_logout
        };