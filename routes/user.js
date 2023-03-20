const express = require("express");
const router = express.Router()
var multer=require('multer');
var app=express();
var bodyparser = require('body-parser');

const user_controller=require("../controller/user_controller")
const auth = require("../middleware/auth");

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static('public/data'))


const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./public/data');

  },
  filename:(req,file,cb)=> {

    cb(null,file .originalname);

  }
});

const upload=multer({storage:storage});

// session Method


router.get('/new_user',auth.login,user_controller.new_user_get);
router.post('/new_user',auth.login, upload.single('img1'), user_controller.new_user);
router.post('/user_new',auth.login, user_controller.user_new);
router.get('/user_list',auth.login, user_controller.user_list);
router.get('/personal_details',auth.login, user_controller.personal_details);
router.get('/user_delete',auth.login,user_controller.delete_user);

module.exports=router;

