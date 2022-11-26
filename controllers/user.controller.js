const express = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user.model');
const saltRounds=10;

const router =  express.Router();

router.post("/api/signup",async function(req,res){
  try {
    var hash = await bcryptjs.hash(req.body.password, saltRounds)
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      number: req.body.number,
      password: hash
    })
    await user.save();
    res.send({
      code: 1,
      msg: "User created",
      data: user
    })
  } catch (e) {
      res.send({
        code: 0,
        msg: "email should be unique"
      })
  }

});

router.get("/api/users",async function(req,res){
  try {
    var user  = await User.find({});
    res.send({
      code:1,
      msg:"all users",
      data:user
    });

  } catch (e) {
    res.send({
      code:0,
      msg:"users not found",
      data:null
    });
  }

});

router.get("/api/user/:id",async function(req,res){
  try {
    var user = await User.findOne({_id:req.params.id});
      res.send({
        code:1,
        msg:"hello user",
        data:user
      })
  } catch (e) {
    res.send({
      code:0,
      msg:"not found",
      data:null
    });
  }
});


router.post("/api/login",async function(req,res){
  try {
    var user = await User.findOne({email:req.body.email});
    var hash = await bcryptjs.compare(req.body.password, user.password)
    if(hash){
      res.send({
        code:1,
        msg:"login successfull",
        data:user
      })
    }
    else{
      res.send({
        code:0,
        msg:"Password Incorrect",
        data:null
      })
    }
  } catch (e) {
    res.send({
      code:0,
      msg:"User not found",
      data:null
    })
  }
});

module.exports = router;
