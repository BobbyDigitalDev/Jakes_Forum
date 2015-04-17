var express = require('express');//requires the express module. creates our server
var sqlite3 = require('sqlite3');//requires the sqlite module. we need to read and write to the database
var fs = require('fs');//allows us to read and write to external files
var Mustache = require('mustache');//allows us to use templating
var request = require('request');
var methodOverride = require('method-override');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var app = express();
var db = new sqlite3.Database('./forum.db');

app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));


app.get('/', function(req, res){
  res.send(fs.readFileSync('./views/index.html', 'utf8'));
});

app.get('/topics', function (req, res){
  var template = fs.readFileSync('./views/topics/index.html', 'utf8');
  db.all("SELECT * FROM topics;", function (err, topics){
    var html = Mustache.render(template, {allTopics: topics});
    res.send(html);
  });

});
  



app.listen(3000, function() {
  console.log("The server is LISTENING bioche!");
});