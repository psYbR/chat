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
  console.log("creating tables...");
  db.query("DROP TABLE users");
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
  )", 
  (err, )=>{
    if (err) throw err;
  });
  return "Tables created.";
}

const dbCreateDefaultAdminUser = () => {
  console.log("creating default admin user...");
  db.query("INSERT INTO users (Nick, Password, Email, IsGlobalAdmin, Theme, ShowSystemMessages, DefaultFont, DefaultColor, lastSeen, isGlobalBanned) \
                       VALUES ('Energizer', SHA2('jiblet123', 256), 'tim.eastwood@hotmail.com', 1, 1, 1, 'Source Sans Pro', 'default', NULL, 0)",
  (err, )=>{
    if (err) throw err;
  });
  return "Default admin account created.";
}

module.exports = { 
  dbCreateTables,
  dbCreateDefaultAdminUser,
  onAdminCreateChannel,
  onRequestChannels
}