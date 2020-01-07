// Required modules
var express = require("express");
var app = express();
var todoController = require("./controllers/todoController.js");

// Set up template engines with EJS
app.set("view engine", "ejs");

// Serve up Static Files using Middleware
app.use(express.static("./public"));

// Fire Controllers
todoController(app);

// Listen to port
app.listen(3000);
console.log("listening to port 3000");
