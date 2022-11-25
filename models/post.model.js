const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
  image:{
    type:String
  },
  caption:{
    type:String
  },
  likes:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }
  ],
  comments:[
    {
      by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
      },
      text:{
        type:String
      },
      at:{
        type:Date
      }
    }
  ]
},
{
  timestamps:true
}
);

const Post = mongoose.model("Post",postSchema);

module.exports = Post;
