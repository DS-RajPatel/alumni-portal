const express = require("express");
const router = express.Router();
var multer=require('multer');
var app=express();
var bodyparser = require('body-parser');



const news_controller=require("../controller/news_controller");
const auth = require("../middleware/auth");


app.use(bodyparser.urlencoded({ extended: true }));
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

router.get('/news_add',auth.login,news_controller.news_add);
router.post('/news_add',upload.single('img1'),news_controller.add_news);
router.get('/news_list',auth.login, news_controller.news_list);
router.get('/news_delete',auth.login, news_controller.news_delete);
router.get('/edit_news_get',auth.login,news_controller.edit_news_get);
router.post('/edit_news',upload.single('img1'),news_controller.edit_news);


module.exports = router;



