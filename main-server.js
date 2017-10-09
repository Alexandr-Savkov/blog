var express = require("express");
var bodyParser = require("body-parser");
var mongoClient = require("mongodb").MongoClient;
var objectId = require("mongodb").ObjectID;

var app = express();
var jsonParser = bodyParser.json();
var url = "mongodb://localhost:27017/blog";

app.use(bodyParser.json({limit: '50mb'})); // for post big data
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(express.static(__dirname + "/"));

app.get("/list", function(req, res){
  mongoClient.connect(url, function(err, db){
    db.collection("articles").find().toArray(function(err, articles){
      res.json(articles);
    });
  });
});

app.get("/getarticle/:id", jsonParser, function(req, res){
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

app.post("/setarticle/:id", jsonParser, function (req, res) {
  console.log(req.body);
  mongoClient.connect(url, function(err, db){
    var id = new objectId(req.params.id);
    db.collection("articles").remove({_id: id})
    db.collection("articles").insertOne(req.body, function(err, result){
      if(err) return res.status(400).send();
      res.send(req.body);
    });
  });
});

app.delete("/delarticle/:id", jsonParser, function(req, res){
  mongoClient.connect(url, function(err, db){
    console.log("in delete req");
    console.log(req.params);
    var id = new objectId(req.params.id);
    db.collection("articles").findOneAndDelete({_id: id}, function(err, result){
      if(err) return res.status(400).send();
      res.send(result);
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

app.post("/delcomment/:id", jsonParser, function(req, res){
  mongoClient.connect(url, function(err, db){
    console.log("in delete comment");
    console.log(req.body);
    console.log(req.params.id);
    var id = new objectId(req.params.id);
    db.collection("articles").updateOne({_id: id}, {$set: {comments: req.body} },
      function(err, result){
        if(err) return res.status(400).send();
        res.send(result);
      });
  });
});

app.get("/getprofile", jsonParser, function(req, res){
  mongoClient.connect(url, function(err, db){
    db.collection("profile").find().toArray(function(err, countries){
      res.json(countries);
    });
  });
});

app.get("/getdefaultprofile", jsonParser, function(req, res){
  mongoClient.connect(url, function(err, db){
    db.collection("defaultprofile").find().toArray(function(err, countries){
      res.json(countries);
    });
  });
});

app.get("/getprofilename", jsonParser, function(req, res){
  mongoClient.connect(url, function(err, db){
    db.collection("profile").find().toArray(function(err, profile){
      res.json(profile[0].name);
    });
  });
});

app.post("/setprofile", jsonParser, function (req, res) {
  console.log(req.body);
  mongoClient.connect(url, function(err, db){
    db.collection("profile").drop();
    db.collection("profile").insert(req.body, function(err, result){
      if(err) return res.status(400).send();
      res.send(req.body);
    });
  });
});

app.get('/countries', jsonParser, function(req, res){
  mongoClient.connect(url, function(err, db){
    console.log("дайте страны");

    db.collection("countries").find().toArray(function(err, countries){
      res.json(countries);
    });
  });
});

app.listen(6083, function(){
  console.log("Сервер ожидает подключения...");
});