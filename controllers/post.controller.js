const express = require("express");
const User = require('../models/user.model');
const Post = require('../models/post.model');
const router = express.Router();

router.get("/api/posts", async function(req,res){
  try {
    var posts = await Post.find({})
    res.send({
      code: 1,
      msg: "All posts sent",
      data: posts
    })
  } catch (e) {
    res.send({
      code: 0,
      msg: "Something went wrong",
      data: null
    })
  }
});

router.get("/api/posts/:id",async function(req,res){
  try {
    var post = await Post.findOne({_id:req.params.id})
    res.send({
      code:1,
      msg:"see your post",
      data:post
    })
  } catch (e) {
    res.send({
      code:0,
      msg:"post not found",
      data:null
    })
  }

});


router.post("/api/post", async function(req,res){
  try {
    var user = await User.findOne({email:req.body.posted_by})
    var post = new Post({
      postedBy:user._id,
      caption:req.body.caption,
      image:req.body.image
    })
    await post.save();
    res.send({
      code: 1,
      msg: "Post created",
      data: post
    })

  } catch (e) {
    res.send({
      code: 1,
      msg: "Something went wrong",
      data: null
    })
  }

});

router.post("/api/like/:id",async function(req,res){
  try{
    var user = await User.findOne({email:req.body.email});
    var post = await Post.findOne({_id:req.params.id});
    var ind = post.likes.indexOf(user._id);
    if(ind != -1){
      post.likes.splice(ind, 1);
    }
    else{
      post.likes.push(user._id);
    }
    await post.save();
    res.send({
      code:1,
      msg:"like done",
      data:post
    })
  }
  catch(e){
    console.log(e);
    res.send({
      code:0,
      msg:"went wrong",
      data:null
    })
  }

});


router.post("/api/comment/:id",async function(req,res){
  try {
    var user  = await User.findOne({email:req.body.email});
    var post = await Post.findOne({_id:req.params.id});
    post.comments.push({
      by:user._id,
      text:req.body.comment,
      at:Date.now()
    })
    await post.save();
    res.send({
      code:1,
      msg:"added",
      data:post
    })
  } catch (e) {
    res.send({
      code:0,
      msg:"err",
      data:null
    })
  }
})

module.exports = router;
