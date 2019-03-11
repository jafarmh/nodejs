const express =require ("express");
const user_api = express.Router();
const mongodb=require("mongodb");
const MongoClient = require('mongodb').MongoClient;
const mongourl=require ('../config/mongodb');
user_api.post("/get/users",(req,res)=>{

  MongoClient.connect(mongourl,{ useNewUrlParser: true })
  .then((db) => {
    var dbo = db.db("mydb");

  dbo.collection('users').find().toArray(function(err, result) {
    if (err) throw err;
    res.json(result);
    db.close();
  });


  })
  .catch((err)=>{
    console.log(err);
  })
})
module.exports = user_api;
