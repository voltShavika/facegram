let promise = new Promise(function(res, rej){
      setTimeout(()=> {
        console.log("I am Second");
        res("done")
      }, 3000)
})

async function demo(){
  console.log("I am First");
  let result = await promise;
  console.log("I am Third");

  User.findOne({}).then((user) => {

  })

  let user = await User.findOne({});
  try {

  } catch (e) {

  } finally {

  }

}

app.get("/home", async function (req, res) {

})

demo();
