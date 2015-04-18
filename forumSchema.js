var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database.db');

//db.run("DROP TABLE topics;");
//db.run("DROP TABLE comments;");
db.run("CREATE TABLE topics (id INTEGER PRIMARY KEY AUTOINCREMENT, title varchar, author varchar, body text, vote integer);");
db.run("CREATE TABLE comments(body text, location text, topics_id integer, FOREIGN KEY(topics_id) REFERENCES topics(id));");