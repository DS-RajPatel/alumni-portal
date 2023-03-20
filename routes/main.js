const express = require("express");

const router = express.Router()
const session = require("express-session");
const auth=require("../middleware/user_auth");
var multer=require('multer');
var app=express();
var bodyparser = require('body-parser');

const userside_controller=require("../controller/user_side.controller");


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static('public/upload/post'))


const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./public/upload/post');
  },
  filename:function(req,filename,cb){
    cb(null,filename.originalname);
  }
});
const upload=multer({storage:storage});





router.use(session({
    secret: 'tT^38dLsddsjc^scswcwscwscscwscwssdcwqfwegrehtrhnaeCT?-Mvu',
    cookie: { maxAge: 1544594 }
}))
  
// redirect to index page 
router.get('/',auth.user_logout,userside_controller.index);
// redirect to index page 
router.get('/index',auth.user_logout,userside_controller.index);
// redirect to login page 
router.get('/login',auth.user_logout,userside_controller.user_login);
router.post('/home',auth.user_logout,userside_controller.authentication);
router.get('/home',auth.user_login,userside_controller.homepage);
// redirect to contact page 
router.get('/contact',auth.user_login,userside_controller.contact);
// redirect to event page 
router.get('/event',auth.user_login,userside_controller.event_list);
// redirect to profile page 
router.get('/profile',auth.user_login,userside_controller.profile);
// redirect to community page 
router.get('/community',auth.user_login,userside_controller.community);
// redirect to contact page 

router.get('/logout', auth.user_login,userside_controller.logout);

router.get('/update', auth.user_login,userside_controller.personalinfo_get);
router.post('/update', auth.user_login,userside_controller.personal_info);

router.post('/add_post',upload.single("desc_file"),userside_controller.add_info);
router.post('/alumni_bio_up', upload.single("avatar"),userside_controller.alumni_bio_up);
router.post('/alumni_bio_new', upload.single("avatar"),userside_controller.alumni_bio_new);
router.get('/alumni', auth.user_login,userside_controller.alumni_bio_up_get);
router.get('/alumni_bio',auth.user_login,userside_controller.alumni_bio);

router.get("/404",async(req,res)=>{
  
res.render("404")
})


  
module.exports = router;
