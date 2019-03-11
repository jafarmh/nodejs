const express=require("express");
const path= require('path');
const app=express();
const router=express.Router();
var bodyParser = require('body-parser');


////set body params
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
////set template engine
app.engine('ejs', require('express-ejs-extend')); // add this line
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

///api
let Users_api=require("./api/users.js");
app.use(Users_api);
///Route start

///Login
var Login=require("./Router/login.js");
app.use(Login);
///register
var Register=require("./Router/register.js");
app.use(Register);
//users
var user=require("./Router/user.js");
app.use(user);
//// set 404 message
app.use(function(req, res, next) {

    return res.status(404).send({ message: 'Route'+req.url+' Not found.' });
});
///set port
const port=process.env.port ||3000;
app.listen(port,()=>{console.log(`Listen ${port} .....`)});
