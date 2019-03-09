const express=require('express');
const Login = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongourl=require ('../config/mongodb');
///use session
const session= require('express-session');
Login.use(session({secret: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"}));
///show login view
Login.get("/",(req,res)=>{

    res.render("../views/login/login");
});
 Login.get("/logout",(req,res)=>{
 req.session.email=undefined;
    res.redirect("/");
});

/// set session for capcha
Login.post("/singel_page/capcha",(req,res)=>{
  req.session.capcha =req.body.captcha.toString();
  res.status("200").send( `ok:${req.session.capcha}`);
});
////Login
Login.post("/login",(req,res)=>{
  console.log(req.session.capcha);
  if (!req.session.capcha)
  {
      res.status("500").send( `capcha is require`);
  }
  var obj=req.body;
  const  myobj = { email: obj.email,password:obj.Password };
  MongoClient.connect(mongourl,{ useNewUrlParser: true })
  .then((db) => {
    var dbo = db.db("mydb");

    dbo.collection('users').findOne(myobj)
    .then((response)=>{
      if(!response)
        {
          res.status("500").send("user not found!");
        }
        else {
          req.session.email=response.email;

        res.send("/user/all");
        }
    });
  })
  .catch((err)=>{
    console.log(err);
  })
});


module.exports = Login;
