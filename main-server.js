var express = require("express");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;

var app = express();
var jsonParser = bodyParser.json();
var url = "mongodb://localhost:27017/blog";

app.use(express.static(__dirname + "/"));

app.get("/list", function(req, res){
  mongoClient.connect(url, function(err, db){
    db.collection("articles").find().toArray(function(err, articles){
      res.json(articles);
    });
  });
});

app.get("/article/:id", function(req, res){
  console.log(req.params.id);
  mongoClient.connect(url, function(err, db){
    var id = new objectId(req.params.id);
    db.collection("articles").findOne({_id: id }, function(err, article){
      res.send(article);
    });
  });
});

app.post("/addarticle", jsonParser, function (req, res) {
  console.log(req.body);
  mongoClient.connect(url, function(err, db){
    db.collection("articles").insertOne(req.body, function(err, result){
      if(err) return res.status(400).send();
      res.send(req.body);
    });
  });
});

app.post("/addcomment", jsonParser, function (req, res) {

  console.log(req.body);

  mongoClient.connect(url, function(err, db){
    var id = new objectId(req.body.id);
    db.collection("articles").updateOne({_id: id}, {$push: {comments: req.body.comment} },
    function(err, result){

      if(err) return res.status(400).send();

      res.send(result);
    });
  });
});

app.post("/delarticle", jsonParser, function(req, res){

  mongoClient.connect(url, function(err, db){
    console.log("in delete req");
    console.log(req.body);
    var id = new objectId(req.body.id);
    db.collection("articles").findOneAndDelete({_id: id}, function(err, result){

      if(err) return res.status(400).send();
      res.send(result);
    });
  });
});

// app.put("/api/users", jsonParser, function(req, res){
//
//   if(!req.body) return res.sendStatus(400);
//   var id = new objectId(req.body.id);
//   var userName = req.body.name;
//   var userAge = req.body.age;
//
//   mongoClient.connect(url, function(err, db){
//     db.collection("users").findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
//       {returnOriginal: false },function(err, result){
//
//         if(err) return res.status(400).send();
//
//         var user = result.value;
//         res.send(user);
//         db.close();
//       });
//   });
// });

app.listen(5088, function(){
  console.log("Сервер ожидает подключения...");
});