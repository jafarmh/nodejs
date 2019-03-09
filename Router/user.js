const express=require('express');
const user = express.Router();
const mongodb=require("mongodb");
const MongoClient = require('mongodb').MongoClient;
const mongourl=require ('../config/mongodb');
const session= require('express-session');
///show login view
user.get("/user/all",(req,res)=>{
  if(req.session.email===undefined)
      res.render("../views/login/login");

  MongoClient.connect(mongourl,{ useNewUrlParser: true })
  .then((db) => {
    var dbo = db.db("mydb");
var resu=[];
  var usersAll=dbo.collection('users').find();
  usersAll.forEach (function (doc,err) {

    resu.push(doc);
  },function(){

      db.close();
      res.render("../views/user/user_all_view",{users:resu});
  });

  })
  .catch((err)=>{
    console.log(err);
  })
});


user.post("/user/delete/id",(req,res)=>{
  if(req.session.email===undefined)
      res.status("500").send("please Login");

    MongoClient.connect(mongourl,{ useNewUrlParser: true })
    .then( (db)=>{
      let dbo =db.db("mydb");
      console.log(req.body.id);
      dbo.collection("users").deleteOne({_id:new mongodb.ObjectID(req.body.id)})
      .then((results)=>{
        console.log(results);
        db.close();
        res.status("200").send("success");
      })
      .catch((err)=>{
        throw err;

      })
    });
});


user.post("/user/get/id",(req,res)=>{
  if(req.session.email===undefined)
      res.status("500").send("please Login");

    MongoClient.connect(mongourl,{ useNewUrlParser: true })
    .then( (db)=>{
      let dbo =db.db("mydb");
      console.log(req.body.id);
      dbo.collection("users").findOne({_id:new mongodb.ObjectID(req.body.id)})
      .then((results)=>{

        db.close();
        res.status("200").send(results);
      })
      .catch((err)=>{
        throw err;

      })
    });
});



user.post("/user/edit/id",(req,res)=>{
  if(req.session.email===undefined)
      res.status("500").send("please Login");

    MongoClient.connect(mongourl,{ useNewUrlParser: true })
    .then( (db)=>{
      let dbo =db.db("mydb");
      let myquery={_id:new mongodb.ObjectID(req.body.id)};
      let newVal={};
      if (req.body.name !=='' && req.body.name !==undefined) {
        newVal['name'] = req.body.name;

      }
      if (req.body.email !=='' && req.body.email !==undefined) {
          newVal['email'] = req.body.email;
      //  newVal.push({email:req.body.email});
      }
      if (req.body.Password !=='' && req.body.Password !==undefined) {
        newVal['password'] = req.body.Password;
      //  newVal.push({password:req.body.Password});
      }


      console.log(newVal);
      console.log(myquery);
      dbo.collection("users").updateOne(myquery,{ $set: newVal },function(err,resu) {
         if (err) throw err;
         db.close();
         res.status("200").send("success");
      });

    });
});
module.exports = user;
