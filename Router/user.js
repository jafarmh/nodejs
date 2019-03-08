const express=require('express');
const user = express.Router();
const MongoClient = require('mongodb').MongoClient;
const mongourl=require ('../config/mongodb');
///show login view
const userall=[];
user.get("/user/all",(req,res)=>{
  MongoClient.connect(mongourl,{ useNewUrlParser: true })
  .then((db) => {
    var dbo = db.db("mydb");

    dbo.collection('users').find().toArray(function(err, result) {
    if (err) throw err;
console.log(result);
userall.push(result);
 });
 console.console.log(userall);
    db.close();
  });
    /*.then((response)=>{
      console.log(response);
      res.render("../views/user/user_all_view",{response});

    });*/
  })




module.exports = user;
