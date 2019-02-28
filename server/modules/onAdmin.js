utils = require('./utils');
globals = require('./globals');
config = require('../config');
io = require('./server');
db = require('./database');

const onRequestChannels = (socket) => {
  globals.log("(ADMIN) Requested channel list.",4);
  db.query("SELECT * FROM channels", (err, result) => {
    if (err) throw err;
    for (var i = 0; i < result.length; i++) {
      //send the channel object
      io.to(socket.id).emit('admin channel', result[i]);
    }
  });
};

const onAdminCreateChannel = (socket, channel) => {
  globals.log("(ADMIN) Created a channel.",4);
  db.query("INSERT INTO channels (name, topic, isVisible, isDefault, requireImage, requireVoice, requireLogin, creatorId, creatorNick) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [channel.name, channel.topic, channel.isVisible, channel.isDefault, channel.requireImage, channel.requireVoice, channel.requireLogin, channel.creatorId, channel.creatorNick]
    ,(err, res)=>{
      if (err) throw err;
      globals.log("(ADMIN) Admin created a new channel.",4);
      io.to(socket.id).emit('admin channel create confirmation');
      globals.channels.push(channel)
  }); 
}

const onAdminEditChannel = (socket, channel) => {
  globals.log("(ADMIN) Edited a channel.",4);
  db.query("UPDATE channels SET name=?, topic=?, isVisible=?, isDefault=?, requireImage=?, requireVoice=?, requireLogin=? WHERE channelId=?",
      [channel.name, channel.topic, channel.isVisible, channel.isDefault, channel.requireImage, channel.requireVoice, channel.requireLogin, channel.channelId]
    ,(err, res)=>{
      if (err) throw err;
      globals.log("(ADMIN) Admin edited a channel.",4);
      io.to(socket.id).emit('admin channel create or edit confirmation');
      globals.channels = globals.channels.filter(chan=>chan.channelId != channel.channelId) //remove
      globals.channels.push(channel) //re-add
  }); 
}

const onAdminDeactivateChannel = (socket, channel) => {
  globals.log("(ADMIN) deactivated a channel.",4);
  db.query("UPDATE channels SET isActive=false WHERE channelId=?",[channel],(err, res)=>{
    if (err) throw err;
    globals.log("(ADMIN) Admin set isActive=false for a channel.",4);
    io.to(socket.id).emit('admin channel create or edit confirmation');
    globals.channels = globals.channels.filter(chan=>chan.channelId != channel)
  });
}

const onConnect = (socket) => {
  socket.on('admin request channels', () => {
    onRequestChannels(socket);
  });
  socket.on('admin create channel', (channel) => {
    onAdminCreateChannel(socket,channel);
  })
  socket.on('admin edit channel', (channel) => {
    onAdminEditChannel(socket,channel);
  })
  socket.on('admin deactivate channel', (channel) => {
    onAdminDeactivateChannel(socket,channel);
  })
}

module.exports = { 
  onConnect
}