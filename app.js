const express = require("express");
const bodyParser = require("body-parser");
const Session = require("express-session");
const cookieParser= require("cookie-parser");

const UserRouter = require("./controllers/user.controller");
const PostRouter = require("./controllers/post.controller");

const connect = require("./config/db");
connect();

const app = express();


const jsonparser = bodyParser.json();
app.use(jsonparser);

app.use(UserRouter);
app.use(PostRouter);
const port = process.env.PORT || 8000;
app.listen(port,()=>{
  console.log("i am listening");
});