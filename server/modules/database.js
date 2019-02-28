
mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "blazechat",
  ,multipleStatements: true
  ,database: "blazechat"
  ,typeCast: function castField( field, useDefaultTypeCasting ) {

    // We only want to cast bit fields that have a single-bit in them. If the field
    // has more than one bit, then we cannot assume it is supposed to be a Boolean.
    if ( ( field.type === "BIT" ) && ( field.length === 1 ) ) {

        var bytes = field.buffer();

        // A Buffer in Node represents a collection of 8-bit unsigned integers.
        // Therefore, our single "bit field" comes back as the bits '0000 0001',
        // which is equivalent to the number 1.
        return( bytes[ 0 ] === 1 );

    }

    return( useDefaultTypeCasting() );

}
});

const initialCreate = false
const sessionReset = false

db.connect((err) => {
  if (err) throw err;
  console.log("(database) Connected!");

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
          userChannelPermissions: userChannelPermissionId, channelId, userId, permissionType, allow
            Permission types: "join", "voice", "image", "op", "owner"
          channels: channelId, name, topic, isVisible, isDefault, requireImage, requireVoice, requireLogin, isActive
          IP: IPId, lastUserId, IPAddress, lastNick, lastActiveDatetime, isGlobalBanned, lastSessionKey
          sessions: sessionId, sessionKey, lastSocketId, lastActiveDatetime, expiryDatetime, lastNick, lastUserID
          */

          // users
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

          // IP (ip address history)
          db.query("CREATE TABLE IF NOT EXISTS IP (\
            IPId int NOT NULL AUTO_INCREMENT,\
            lastUserId int NOT NULL,\
            IPAddress varchar(255) NOT NULL,\
            lastNick varchar(100),\
            lastActiveDatetime datetime NOT NULL,\
            isGlobalBanned bit NOT NULL DEFAULT 0,\
            lastSessionKey varchar(100),\
            PRIMARY KEY (IPId))", function (err, result) {
              if (err) throw err;
              console.log("'IP' (IP address history) table created");
          });

          // channelPermissions
          db.query("CREATE TABLE IF NOT EXISTS channelPermissions (\
            channelPermissionId int NOT NULL AUTO_INCREMENT,\
            channelId int NOT NULL,\
            userId int NOT NULL,\
            permissionType varchar(100) NOT NULL,\
            allow bit NOT NULL DEFAULT 1,\
            PRIMARY KEY (channelPermissionId))", function (err, result) {
              if (err) throw err;
              console.log("'channelPermissions' table created");
          });
          
          // sessions
          db.query("CREATE TABLE IF NOT EXISTS sessions (\
            sessionId int NOT NULL AUTO_INCREMENT,\
            sessionKey varchar(100) NOT NULL,\
            lastSocketId varchar(100) NOT NULL,\
            lastActiveDatetime datetime NOT NULL,\
            expiryDatetime datetime NOT NULL,\
            lastNick varchar(100) NULL,\
            lastUserId varchar(100) NULL,\
            PRIMARY KEY (sessionId))", function (err, result) {
              if (err) throw err;
              console.log("'sessions' table created");
          });

          // channels
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

  if (!initialCreate) {

    //load list of default channels
    db.query("SELECT * FROM channels WHERE isVisible=1 AND isDefault=1 AND isActive=1", (err, result) => {
      if (err) throw err;
      for (var i = 0; i < result.length; i++) {
        globals.channels.push(result[i])
      }
      globals.log("(database) Default channels registered.")
    });

    if (!sessionReset) {
      //restore sessions, skipping ones that had no nick associated
      db.query("SELECT sessionKey, lastSocketId, lastNick, lastUserId, unix_timestamp(expiryDatetime) * 1000 as expiryDatetime FROM sessions WHERE expiryDatetime > NOW()", (err, result) => {
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
          globals.sessions.push({
            sessionKey: result[i].sessionKey,
            socketId: result[i].lastSocketId,
            lastNick: result[i].lastNick,
            lastUserId: result[i].lastUserId,
            expiryDatetime: result[i].expiryDatetime
          })
          globals.log("(database) Session restored for: '" + result[i].lastNick + "', " + result[i].lastUserId + ", " + result[i].sessionKey)
        } 
      });
    } else {
      //delete sessions
      db.query("DELETE FROM sessions", (err, result) => {
        if (err) throw err;
      });
    }


    


  }


});



module.exports = db; 
