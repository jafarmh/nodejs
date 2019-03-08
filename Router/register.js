const express=require('express');
const Register = express.Router();
const MongoClient = require('mongodb').MongoClient;

///show Register view
Register.get("/register",(req,res)=>{
    res.render("../views/Register/register");
});

///insert User
let trues='';
const mongourl=require ('../config/mongodb');
Register.post("/register/user/add",(req,res) =>{
  const  myobj = { name: req.body.name, email: req.body.email,password:req.body.Password };


  MongoClient.connect(mongourl, function(err, db) {
    if (err) throw err;

    var dbo = db.db("mydb");
      console.log(trues);
    dbo.collection("users").insertOne(myobj,function (err,res) {
      if (err) throw err;

      console.log("1 document inserted");
      db.close();
    })
    res.status("200").send("user add success!");
  });
});

module.exports = Register;
