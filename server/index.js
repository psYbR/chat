var io = require('./modules/server');
var getIpAddress      = require('./modules/getIPAddress');
var onDisconnect      = require('./modules/onDisconnect');
var onChatMessage     = require('./modules/onChatMessage');
var onSetNick         = require('./modules/onSetNick');
var onRequestChannels = require('./modules/onRequestChannels');
var onJoinChannel     = require('./modules/onJoinChannel');
var onRequestUserList = require('./modules/onRequestUserList');
var onRequestLeaveChannel = require('./modules/onRequestLeaveChannel');
admin = require('./modules/onAdmin');
db = require('./modules/database');

//called whenever a client connects (or reconnects)
io.on('connection', (socket) => {

  globals.log("(index) Connection from: " + getIpAddress(socket));

  socket.on('leave channel', (channelId, callback) => {
    try {
      callback(onRequestLeaveChannel(socket, channelId));
    } catch(err) {
      globals.log('(index) Failed to call onRequestLeaveChannel: "' +  err + '" for client: ' + socket.id, 2)
    }
  });

  socket.on('disconnect', (reason) => {
    try {
      onDisconnect(socket, reason);
    } catch(err) {
      globals.log('(index) Failed to call onDisconnect: "' +  err + '" for client: ' + socket.id, 2)
    }
  });

  socket.on('chat message', (msg, callback) => {
    try {
      callback(onChatMessage(socket, msg));
    } catch(err) {
      globals.log('(index) Failed callback for onChatMessage: "' +  err + '" for client: ' + socket.id, 2)
    }
  });

  socket.on('set nick', (nick, callback) => {
    try {
      callback(onSetNick(socket, nick));
    } catch(err) {
      globals.log('(index) Failed callback for onSetNick: "' +  err + '" for client: ' + socket.id, 2)
    }
    
  });

  socket.on('request default channels', () => {
    try {
      onRequestChannels.onRequestDefaultChannels(socket);
    } catch(err) {
      globals.log('(index) Failed to call onRequestChannels.onRequestDefaultChannels: "' +  err + '" for client: ' + socket.id, 2)
    }
  });

  socket.on('request user channels', () => {
    try {
      onRequestChannels.onRequestUserChannels(socket);
    } catch(err) {
      globals.log('(index) Failed to call onRequestChannels.onRequestUserChannels: "' +  err + '" for client: ' + socket.id, 2)
    }
  });

  socket.on('join channel', (channelId, callback) => {
    try {
      callback(onJoinChannel(socket, channelId));
    } catch(err) {
      globals.log('(index) Failed callback for onJoinChannel: "' +  err + '" for client: ' + socket.id, 2)
    }
  });

  socket.on('request user list', (channelId, callback) => {
    try {
      callback(onRequestUserList(socket, channelId));
    } catch(err) {
      globals.log('(index) Failed callback for onGetUserList: "' +  err + '" for client: ' + socket.id, 2)
    }
  });

  socket.on('admin request channels', () => {
    admin.onRequestChannels(socket);
  });

});
