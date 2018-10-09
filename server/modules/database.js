
mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "blaze",
  password: "blazes"
  ,multipleStatements: true
  ,database: "blazechat"
});


db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");

  //const initialCreate = true
  const initialCreate = false
  if (initialCreate) {

    db.query("DROP DATABASE blazechat", (err, result) => {
      if (err) throw err;
      console.log("Database deleted");

      db.query("CREATE DATABASE IF NOT EXISTS blazechat", (err, result) => {
        if (err) throw err;
        console.log("Database created");

        db.query("USE blazechat", (err, result) => {
          if (err) throw err;

          /*  Database structure

          users: userId, nick, isAdmin, lastSeen, isGlobalBanned
          userChannelPermissions: userChannelPermissionId, channelId, userId, permissionType
          channels: channelId, name, topic, isVisible, isDefault, requireImage, requireVoice, requireLogin, isActive
          userIPHistory: userIPHistoryId, userId, IPAddress, hostname, nick, seen
          */

          db.query("CREATE TABLE IF NOT EXISTS users (\
            userId int NOT NULL AUTO_INCREMENT,\
            nick varchar(255) NULL,\
            isAdmin bit NOT NULL DEFAULT 0,\
            lastSeen datetime NULL,\
            isGlobalBanned bit NOT NULL DEFAULT 0,\
            email varchar(1024) NULL,\
            password varchar(1024) NULL,\
            PRIMARY KEY (userId))", function (err, result) {
            if (err) throw err;
            console.log("'users' table created");

            db.query("INSERT INTO users (nick, isAdmin, email, password) VALUES ('Energizer', 1, 'tim.eastwood@hotmail.com', SHA2(?, 256))",['jiblet123'],  (err, result) => {
              if (err) throw err;
              console.log("Default user created"); 
            });

          });

          db.query("CREATE TABLE IF NOT EXISTS channels (\
            channelId int NOT NULL AUTO_INCREMENT,\
            name varchar(255) NOT NULL,\
            topic varchar(2048) NULL,\
            isVisible bit NOT NULL DEFAULT 1,\
            isDefault bit NOT NULL DEFAULT 1,\
            requireImage bit NOT NULL DEFAULT 0,\
            requireVoice bit NOT NULL DEFAULT 0,\
            requireLogin bit NOT NULL DEFAULT 0,\
            isActive bit NOT NULL DEFAULT 1,\
            PRIMARY KEY (channelId))", function (err, result) {
            if (err) throw err;
            console.log("'channels' table created");

            db.query(
              "INSERT INTO channels (name, topic) VALUES ('lobby', 'Welcome to the lobby');\
              INSERT INTO channels (name, topic) VALUES ('help', 'Join this channel to get help using Chat App');\
              INSERT INTO channels (name, topic) VALUES ('technology', 'for discussion of all things tech-related');\
              INSERT INTO channels (name, topic) VALUES ('music', 'for discussion of all things music');\
              INSERT INTO channels (name, topic) VALUES ('movies', 'for discussion of all things movies');\
              INSERT INTO channels (name, topic) VALUES ('tv', 'for discussion of all things TV');\
              INSERT INTO channels (name, topic) VALUES ('software', 'for discussion of all things software');\
              INSERT INTO channels (name, topic) VALUES ('games', 'for discussion of all things games');\
              INSERT INTO channels (name, topic) VALUES ('consoles', 'for discussion of all things consoles');\
              INSERT INTO channels (name, topic) VALUES ('retro', 'for discussion of all things retro tech');\
              INSERT INTO channels (name, topic) VALUES ('art', 'for discussion of all things art');\
              INSERT INTO channels (name, topic) VALUES ('photography', 'for discussion of all things photography');\
              INSERT INTO channels (name, topic) VALUES ('drones', 'for discussion of all things related to drones');\
              INSERT INTO channels (name, topic) VALUES ('travel', 'for discussion of all things travel');\
              INSERT INTO channels (name, topic) VALUES ('news', 'for discussion of all things related to world news');\
              INSERT INTO channels (name, topic) VALUES ('melbourne', 'people from melbourne, gather here');\
              INSERT INTO channels (name, topic) VALUES ('sydney', 'people from sydney, gather here');\
              INSERT INTO channels (name, topic) VALUES ('perth', 'people from perth, gather here');\
              INSERT INTO channels (name, topic) VALUES ('brisbane', 'people from brisbane, gather here');\
              INSERT INTO channels (name, topic) VALUES ('nz', 'people from new zealand, gather here');"
              ,  (err, result) => {
              if (err) throw err;
              console.log("Default channels inserted");
            });

          });

          // db.query("SELECT", (err, result) => {
          //   if (err) throw err;
          // });

        });

        

      });

    });
  }

  //load list of default channels
  db.query("SELECT * FROM channels WHERE isVisible=1 AND isDefault=1 AND isActive=1", (err, result) => {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      globals.defaultChannels.push(result[i])
      globals.log("Default channel registered: " + result[i].name)
    }
  });


});



module.exports = db; 