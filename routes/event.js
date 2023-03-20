const express = require("express");
const router = express.Router();
var multer=require('multer');
var app=express();
var bodyparser = require('body-parser');

const user_details_model=require("../model/user_details");
const admin_model=require("../model/admin_info");

const event_controller=require("../controller/event_controller")
const auth = require("../middleware/auth");


app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static('public/upload'))


const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./public/upload');
  },
  filename:function(req,filename,cb){
    cb(null,filename.originalname);
  }
});
const upload=multer({storage:storage});


router.get('/event_add',auth.login,event_controller.event_add);
router.get('/event_list',auth.login,event_controller.event_list);
router.get('/events_delete',auth.login,event_controller.event_delete);
router.get('/edit_event',auth.login,event_controller.edit_event_get);

router.post('/add_event',upload.single('img'),event_controller.add_event);
router.post('/edit_event',upload.single('img'),event_controller.edit_event);


module.exports = router;



