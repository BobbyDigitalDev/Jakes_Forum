  var express = require('express');//requires the express module. creates our server
  var sqlite3 = require('sqlite3');//requires the sqlite module. we need to read and write to the database
  var fs = require('fs');//allows us to read and write to external files
  var Mustache = require('mustache');//allows us to use templating
  var request = require('request');
  var methodOverride = require('method-override');
  var morgan = require('morgan');
  var bodyParser = require('body-parser');
  var util = require('util');
  var marked = require('marked');

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    breaks: false,
    pedantic: false,
    sanitize: true,
    smartLists: true,
    smartypants: false
  });

  var app = express();
  var db = new sqlite3.Database('./database.db');

  app.use(express.static('public'));
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(methodOverride('_method'));

  //VIEWING THE HOMEPAGE
  app.get('/', function(req, res){
    res.send(fs.readFileSync('./views/index.html', 'utf8'));
  });

  //VIEWING ALL TOPICS IN A LIST
  app.get('/topics', function (req, res){
    var template = fs.readFileSync('./views/topics/index.html', 'utf8');
    db.all("SELECT * FROM topics;", function (err, topics){
      var html = Mustache.render(template, {allTopics: topics});
      res.send(html);
    });
  });

  //ADDING A TOPIC
  //takes the user to the add page
  app.get('/topics/new', function (req, res){
    res.send(fs.readFileSync('./views/topics/new.html', 'utf8'));//syncronous readFileSync to keep it from blowing past everything.
  });
  //posts into the add page
  app.post('/topics/new', function (req, res){
    console.log(req.body);
    db.run("INSERT INTO topics (title, author, topicsbody, vote) VALUES ('"+req.body.title+"','"+req.body.author+"','"+req.body.topicsbody+"', '"+0+"')");
    res.redirect("/topics");
  });

  //ADDING A COMMENT 
  app.post('/topics/:id/comments', function (req, res){
    id = req.params.id;
    request.get('http://ipinfo.io/', function (error, response, body){  
    var parsedLoc = JSON.parse(body);
    var loc = parsedLoc.city + ', ' + parsedLoc.country;
    console.log(body);
    db.run("INSERT INTO comments (commentsbody, location, topics_id) VALUES('"+req.body.commentsbody+"','"+loc+"','"+id+"')");
    res.redirect("/topics/"+ id);
    });
  });

  //EDITING A TOPIC

  //Gets us to the edit resource
  app.get('/topics/:id/edit', function (req, res){
    var template = fs.readFileSync('./views/topics/edit.html', 'utf8');
    var id = req.params.id;
    db.all("SELECT * FROM topics WHERE id = "+id+";", function (err, topics){
      var htmlE= Mustache.render(template, topics[0]);
      res.send(htmlE);
    });
  });

  //to actually edit the topic
  app.put('/topics/:id', function (req, res){
    var id = req.params.id;
    var topicsInfo = req.body;
    db.run("UPDATE topics SET title =  '" + topicsInfo.title + "', author = '" + topicsInfo.author + "', body = '"+topicsInfo.body+"' WHERE id = " + id + ";");
    res.redirect("/topics");
  });


  //deletes a topic
  app.delete('/topics/:id', function (req, res){
    var id = req.params.id;
    db.run("DELETE FROM topics WHERE id = "+id+";");
    res.redirect("/topics");
  });

  //individual topic get always keep this on the bottom
  app.get('/topics/:id', function (req, res){
    var id = req.params.id;
    db.all("SELECT * FROM topics WHERE id ="+id+";", {}, function (err, topic){
          console.log(topic);
      db.all("SELECT * FROM comments WHERE topics_id = "+id+";",{}, function (err, comments){
        var showTempl = fs.readFile('./views/topics/show.html', 'utf8');
        //console.log(comments);
          var renderedHTML = Mustache.render(showTempl, {});
          res.send(renderedHTML);
        
      });
    });
  });
          // debugger

    //individual topic get always keep this on the bottom WORKING!
  // app.get('/topics/:id', function (req, res){
  //   var id = req.params.id;
  //   db.all("SELECT * FROM topics WHERE id ="+id+";", {}, function (err, data){
  //     fs.readFile('./views/topics/show.html', 'utf8', function (err, contentsoFile){
  //       var renderedHTML = Mustache.render(contentsoFile, data[0]);
  //       res.send(renderedHTML);
  //       // console.log(renderedHTML);
  //     });
  //   });
  // });

  app.listen(3000, function() {
    console.log("The server is LISTENING bioche!");
  });