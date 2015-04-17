var express = require('express');//requires the express module. creates our server
var sqlite3 = require('sqlite3');//requires the sqlite module. we need to read and write to the database
var fs = require('fs');//allows us to read and write to external files
var Mustache = require('mustache');//allows us to use templating
var request = require('request');
var methodOverride = require('method-override');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var util = require('util');

var app = express();
var db = new sqlite3.Database('./forum.db');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));

//homepage get
app.get('/', function(req, res){
  res.send(fs.readFileSync('./views/index.html', 'utf8'));
});
//topics list get
app.get('/topics', function (req, res){
  var template = fs.readFileSync('./views/topics/index.html', 'utf8');
  db.all("SELECT * FROM topics;", function (err, topics){
    var html = Mustache.render(template, {allTopics: topics});
    res.send(html);
  });
});

//takes the user to the add page
app.get('/topics/new', function (req, res){
  //console.log("hello");
  res.send(fs.readFileSync('./views/topics/new.html', 'utf8'));//syncronous readFileSync to keep it from blowing past everything.
});

app.post('./topics:id', function (req, res){
  console.log(req.body);
  db.run("INSERT INTO topics (title, author, body, vote) VALUES ('"+req.body.title+"','"+req.body.author+"','"+req.body.body+"')");
  //res.redirect("/topics");
});

//individual topic get
app.get('/topics/:id', function (req, res){
  var id = req.params.id;
  db.all("SELECT * FROM topics WHERE id ="+id+";", {}, function (err, data){
    fs.readFile('./views/topics/show.html', 'utf8', function (err, contentsoFile){
      var renderedHTML = Mustache.render(contentsoFile, data[0]);
      //console.log("hello");
      res.send(renderedHTML);
      // console.log(renderedHTML);
      // console.log(body)
    });
  });
});


  



app.listen(3000, function() {
  console.log("The server is LISTENING bioche!");
});