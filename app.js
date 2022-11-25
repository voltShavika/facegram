const express = require("express");
const cors = require('cors');
const bodyParser = require("body-parser");
const Session = require("express-session");
const cookieParser= require("cookie-parser");

const UserRouter = require("./controllers/user.controller");
const PostRouter = require("./controllers/post.controller");

const connect = require("./config/db");
connect();


const app = express();
app.use(cors());
app.set("view engine","ejs");


const jsonparser = bodyParser.json();
app.use(jsonparser);

app.get("/", (req, res) => {
  res.render("home.ejs");
})

app.use(UserRouter);
app.use(PostRouter);
const port = process.env.PORT || 80;
app.listen(port,()=>{
  console.log("i am listening");
});
