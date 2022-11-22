const express = require("express");
const bcryptjs = require("bcryptjs");

const User = require('../models/user.model');
const saltRounds=10;

const router =  express.Router();

router.post("/api/signup",function(req,res){
  bcryptjs.hash(req.body.password,saltRounds,function(error,hash){
    if(!error){
      const user = new User({
        name:req.body.name,
        email:req.body.email,
        number:req.body.number,
        password:hash
      })
      user.save(function(err){
        if(!err){
          res.send({
            code:1,
            msg:"user created",
            data:user
          })
        }else{
          res.send({
            code:0,
            msg:"user not created",
            data:null
          })
        }
      })
    }
    else{
      res.send({
        code:0,
        msg:"went wrong",
        data:null
      })
    }
  })

});

router.get("/api/users",function(req,res){
  User.find({},function(err,users){
    res.send({
      code:1,
      msg:"all users",
      data:users
    });
  })

});

router.get("/api/user/:id",function(req,res){
  User.findOne({_id:req.params.id},function(err,user){
    if(!err){
      res.send({
        code:1,
        msg:"hello user",
        data:user
      })
    }else{
      res.send({
        code:0,
        msg:"not found",
        data:data
      });
    }
  })
});


router.post("/api/login",function(req,res){
  User.findOne({email:req.body.email}).then(function(user){
    bcryptjs.compare(req.body.password,user.password,function(err,result){
      if(result){
        res.send({
          code:1,
          msg:"login successfull",
          data:user
        })
      }else{
        res.send({
          code:0,
          msg:"wrong password",
          data:null
        })
      }
    })
  }).catch(function(error){
    res.send({
      code:0,
      msg:"login unsucessfull",
      data:null
    })
  })
})

module.exports = router;
