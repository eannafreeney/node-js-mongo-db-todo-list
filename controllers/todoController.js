// Require Body Parser to handle the body of POST reqs
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Require Mongoose for interacting with MongoDB
var mongoose = require("mongoose");

// Connect to the database
mongoose.connect("mongodb+srv://test:<test>@cluster0-strdx.mongodb.net/test");

// Create Schema - a blueprint for data for Mongo
var todoSchema = new mongoose.Schema({
  item: String
});

// Create Model type based on schema
var Todo = mongoose.model("Todo", todoSchema);

module.exports = function(app) {
  app.get("/todo", function(req, res) {
    // get data from mongodb and render it for the client
    Todo.find({}, function(err, data) {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, function(req, res) {
    // Get data from client and add it to mongoDB
    var newTodo = Todo(req.body).save(function(err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete("/todo/:item", function(req, res) {
    // delete requested item from db
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function(
      err,
      data
    ) {
      if (err) throw err;
      res.json(data);
    });
  });
};
