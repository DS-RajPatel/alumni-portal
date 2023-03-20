// var mysql = require("mysql");
var express = require("express");
const mongoose = require("mongoose");
const path = require("path");
var app = express();
const jwt = require("jsonwebtoken");

var session = require('express-session')
var bodyparser = require('body-parser');





// Routes exported files
const routes = require('./routes/main');
const adroutes=require('./routes/admin')
const userroutes=require('./routes/user');
const eventroutes=require("./routes/event");
const program=require("./routes/program");
const newsroutes=require("./routes/news");



// model exported Files

const event = require("./model/events");
const programm=require("./model/program");
const admin=require("./model/admin_info");
const alm_bio=require("./model/alumni_bio");
const contact=require("./model/contact");
const news=require("./model/news");
const user_details=require("./model/user_details");



app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

mongoose.set('strictQuery', true);
app.use('', routes);
app.use('',adroutes);
app.use('',userroutes);
app.use('',eventroutes);
app.use('',newsroutes);

app.use('',program);

app.use(session({
  secret: 'tT^38dLsddsjc^scswcwscwscwsdcwqfwegrehtrhnaeCT?-Mvu'
}))


// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')))
// Set view Folder
app.set('views', path.join(__dirname, 'views'))

  


//temp. engine
app.set('view engine', 'ejs');

app.set('views', 'views');


mongoose.connect('mongodb://127.0.0.1:27017/srki', () => {
  
  console.log("connect")

});


// mongoose.connect('mongodb+srv://Richvision:Root@demo.dv7q86x.mongodb.net/srki?retryWrites=true&w=majority', () => {
  
//   console.log("connect")

// });









// Server And port allocation

var server = app.listen(8888, function () {

  console.log("app runnning at 8888");
  console.log("http://localhost:8888/");

});
