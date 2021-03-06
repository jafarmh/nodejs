const express=require('express');
const Register = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongourl=require ('../config/mongodb');
///show Register view
Register.get("/register",(req,res)=>{
    res.render("../views/Register/register");
});

///insert User
let trues='';

Register.post("/register/user/add",(req,res) =>{
const  myobj = { name: req.body.name, email: req.body.email,password:req.body.Password };


MongoClient.connect(mongourl,{ useNewUrlParser: true })
.then((db) => {
  var dbo = db.db("mydb");

  dbo.collection('users').findOne({'email': myobj.email})
  .then((response)=>{
    if(!response)
      {
        dbo.collection("users").insertOne(myobj,function (err,res) {
          if (err) throw err;

          console.log("1 document inserted");
          db.close();
        });
        res.status("200").send("user add success! now go to login");
      }
      else {
        res.status("500").send("email already exists!");
      }
  });
})
.catch((err)=>{
  console.log(err);
})

  /*MongoClient.connect(mongourl, function(err, db) {
    if (err) throw err;

    var dbo = db.db("mydb");
      console.log(trues);
    dbo.collection("users").insertOne(myobj,function (err,res) {
      if (err) throw err;

      console.log("1 document inserted");
      db.close();
    })
    res.status("200").send("user add success!");
  });*/
});

module.exports = Register;
