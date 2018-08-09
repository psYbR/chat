utils = require('./utils');
globals = require('./globals');
config = require('../config');
io = require('./server');
db = require('./database');

const onRequestChannels = (socket) => {
  config.defaultChannels.map((channel, i)=>{

    //we don't want to send the entire channel object, so here we set up a new one with the required values in it
    const outgoingChannel = {
      channelId: channel.channelId,
      channelName: channel.channelName,
      topic: channel.topic,
      isVisible: true,
      isDefault: true,
      requiresVoice: false,
      requiresRegistration: false,
      creatorId: 123456789, 
      creatorNick: '*'
    };

    //send the channel object
    io.to(socket.id).emit('admin channel', outgoingChannel);

  });
};

const onAdminCreateChannel = (socket, channel) => {
  console.log("[ADMIN] Create channel:");
  console.log(channel);
}

const dbCreateTables = () => {
  console.log("Creating tables...");
  //db.query("DROP TABLE IF EXISTS users");
  db.query("CREATE TABLE IF NOT EXISTS users ( \
    UserId int UNSIGNED AUTO_INCREMENT PRIMARY KEY \
    ,Nick varchar(100) \
    ,Password varchar(8000) \
    ,Email varchar(255) \
    ,IsGlobalAdmin int \
    ,Theme int \
    ,ShowSystemMessages int \
    ,DefaultFont varchar(100) \
    ,DefaultColor varchar(100) \
    ,lastSeen datetime \
    ,isGlobalBanned int \
  )",(err)=>{if(err)throw err});
  return "Tables creating, see server console for result.";
}

const dbCreateDefaultAdminUser = () => {
  db.query("SELECT * FROM users WHERE Nick='Energizer'", (err, result) => {
    if (err) throw err;
    if (result.length > 0){
      console.log("Default admin user already exists.");
    } else {
      db.query("INSERT INTO users (Nick, Password, Email, IsGlobalAdmin, Theme, ShowSystemMessages, DefaultFont, DefaultColor, lastSeen, isGlobalBanned) \
      VALUES ('Energizer', SHA2('jiblet123', 256), 'tim.eastwood@hotmail.com', 1, 1, 1, 'Source Sans Pro', 'default', NULL, 0)",(err)=>{
        if (err) throw err;
        console.log("Created default admin user.");
      });
    }
  });
  return "See server console for result.";
}

const onConnect = (socket) => {
  socket.on('admin request channels', () => {
    admin.onRequestChannels(socket);
  });
  socket.on('admin create channel', (channel) => {
    admin.onAdminCreateChannel(socket,channel);
  })
  socket.on('admin create database tables', (callback) => {
    callback(admin.dbCreateTables());
  })
  socket.on('admin create default admin user', (callback) => {
    callback(admin.dbCreateDefaultAdminUser());
  })
}

module.exports = { 
  onConnect
}