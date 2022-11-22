const express = require("express");
const User = require('../models/user.model');
const Post = require('../models/post.model');
const router = express.Router();

router.get("/api/posts",function(req,res){
  Post.find({}).then(function(posts){
    res.send({
      code:1,
      msg:"all posts",
      data:posts

    })
  })
});

router.get("/api/posts/:id",function(req,res){
  Post.findOne({_id:req.params.id}).then(function(post){
    res.send({
      code:1,
      msg:"see your post",
      data:post
    })
  }).catch(function(err){
    res.send({
      code:0,
      msg:"post not found",
      data:null
    })
  })
});


router.post("/api/post",function(req,res){
  console.log(req.body);
  User.findOne({email:req.body.posted_by}).then(function(user){
    if(user){
      const post = new Post({
        postedBy:user._id,
        caption:req.body.caption,
        image:req.body.image
      })
      post.save(function(err){
        if(!err){
          res.send({
            code:1,
            msg:"post created",
            data:post
          })
        }else{
          res.send({
            code:0,
            msg:"post not created",
            data:null
          })
        }

      })
    }else{
      res.send({
        code:0,
        msg:"user not found",
        data:null
      })
    }
  }).catch(function(err){
    res.send({
      code:0,
      msg:"went wrong",
      data:null
    })
  })

});

router.post("/api/like/:id",function(req,res){
  User.findOne({email:req.body.email}).then(function(user){
    Post.findOne({_id:req.params.id}).then(function(post){
      var ind = post.likes.indexOf(user._id);
      if(ind != -1){
        post.likes.splice(ind, 1);
      }
      else{
        post.likes.push(user._id);
      }
      post.save(function(err){
        if(!err){
          res.send({
            code:1,
            msg:"like done",
            data:post
          })
        }
      })
    })
  }).catch(function(error){
    res.send({
      code:0,
      msg:"went wrong",
      data:null
    })
  })
});


router.post("/api/comment/:id",function(req,res){
  User.findOne({email:req.body.email}).then(function(user){
    Post.findOne({_id:req.params.id}).then(function(post){
      post.comments.push({
        by:user._id,
        text:req.body.comment,
        at:Date.now()
      })
      post.save(function(err){
        if(!err){
          res.send({
            code:1,
            msg:"added",
            data:post
          })
        }
      })
    })
  }).catch(function(e){
    res.send({
      code:0,
      msg:"err",
      data:null
    })
  })
})

module.exports = router;
