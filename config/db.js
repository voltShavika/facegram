const mongoose = require("mongoose");

const url = "mongodb+srv://shavika:Cant@2019@cluster0.evijg.mongodb.net/facegram?retryWrites=true&w=majority"

const connectDB = function(){
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error"));
  db.once("open", function() {
    console.log("Database Connected successfully");
  });
};

module.exports = connectDB;
