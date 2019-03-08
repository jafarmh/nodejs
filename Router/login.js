const express=require('express');
const Login = express.Router();
///use session
const session= require('express-session');
Login.use(session({secret: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"}));
///show login view
Login.get("/",(req,res)=>{
    res.render("../views/login/login",{
		fonts:true,
	});
});

/// set session for capcha
Login.post("/singel_page/capcha",(req,res)=>{

  req.session.capcha =req.body.captcha.toString();
  res.status("200").send( `ok:${req.session.capcha}`);
});
////Login
Login.post("/login",(req,res)=>{
  if (!req.session.capcha)
  {
      res.status("500").send( `capcha is require`);
  }
  var obj=req.body;
  var result = Object.keys(obj).map(function(key) {
    return [(key), obj[key]];
  });
  res.status("200").send( `ok:${result}`);
});


module.exports = Login;
