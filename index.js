const express = require("express");
const path = require("path");
const port = 8080;
const db = require("./config/mongoose");
const account = require("./models/accountschema");

const app = express();
app.set("useCreateIndex", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());

app.use(express.static("assests"));

app.get("/", function (req, res) {
  return res.render("home", {
    title: "Authentication",
  });
});

// app.post("/create-account" , function(req , res){
//   account.c
// })

app.post("/create-account", function (req, res) {
  // console.log(req.body)
  account.create(
    {
      name: req.body.name,
      pass: req.body.pass,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating a account");
        // window.alert("Details Incorrect")

        return res.redirect("back");
      }

      if (newContact) {
        console.log("*******", newContact);
        return res.render("login", { title: "Play us with ejs" });
      } else {
        console.log("User Already exits");
        return res.redirect("back");
      }
    }
  );
});

app.post("/login-sucessfull", function (req, res) {
  let name = req.body.name;
  // console.log(id);
  // let pass = req.body.pas
  account.find({ name: name }, function (err, data) {
    // console.log(data)
    if (data.length == 0) {
      console.log("error");
      return res.redirect("back");
    } else {
      console.log("heyyy login sucessfull data is " + data);
      let name = data[0].name;
      console.log("my name is ", name);
      return res.render("logindone", {
        title: name,
      });
    }
  });
});
app.get("/create-account", function (req, res) {
  return res.render("login", {
    title: "Login Complete",
  });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error running ", err);
  }
  console.log("yup my express server running on port");
});
