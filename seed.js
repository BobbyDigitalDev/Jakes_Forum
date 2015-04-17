var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./forum.db');

db.run("INSERT INTO topics (title, author, body, vote) VALUES ('How to create better bokeh', 'bobby', 'Body of the topic','0')");
db.run("INSERT INTO topics (title, author, body, vote) VALUES ('How to build better websites', 'cary', 'Body of the topic','0' )");
db.run("INSERT INTO topics (title, author, body, vote) VALUES ('How to write better songs', 'kangil', 'Body of the topic','0' )");
db.run("INSERT INTO topics (title, author, body, vote) VALUES ('How compose nicer poems', 'colby', 'Body of the topic','0' )");
db.run("INSERT INTO topics (title, author, body, vote) VALUES ('How to hack chromebooks', 'ryuske', 'Body of the topic','0' )");
db.run("INSERT INTO topics (title, author, body, vote) VALUES ('How learn japanese in 3 months', 'nesta', 'Body of the topic','0' )");

db.run("INSERT INTO comments (body, location, topics_id) VALUES ('I love Bokeh', 'queens, NY, US', 1)" );
db.run("INSERT INTO comments (body, location, topics_id) VALUES ('cameras are awesome', 'brooklyn, NY, US', 1)" );
db.run("INSERT INTO comments (body, location, topics_id) VALUES ('squarespace is cool', 'staten island, NY, US', 2)" );
db.run("INSERT INTO comments (body, location, topics_id) VALUES ('songs are calming', 'manhattan, NY, US', 3)" );
db.run("INSERT INTO comments (body, location, topics_id) VALUES ('poems are fun', 'brooklyn, NY, US', 4)" );
db.run("INSERT INTO comments (body, location, topics_id) VALUES ('chrome books are handy', 'bronx, NY, US', 5)" );
db.run("INSERT INTO comments (body, location, topics_id) VALUES ('japanese is my favorite', 'queens, NY, US', 6)" );