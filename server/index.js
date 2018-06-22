var io = require('./modules/server');
var getIpAddress      = require('./modules/getIPAddress');
var onDisconnect      = require('./modules/onDisconnect');
var onChatMessage     = require('./modules/onChatMessage');
var onSetNick         = require('./modules/onSetNick');
var onRequestChannels = require('./modules/onRequestChannels');
var onJoinChannel     = require('./modules/onJoinChannel');
var onGetUserList     = require('./modules/onGetUserList');

//called whenever a client connects (or reconnects)
io.on('connection', (socket) => {

  console.log("Connection from: " + getIpAddress(socket));

  socket.on('disconnect', (reason) => {
    onDisconnect(socket, reason);
  });

  socket.on('chat message', (msg, callback) => {
    callback(onChatMessage(socket, msg));
  });

  socket.on('set nick', (nick, callback) => {
    callback(onSetNick(socket, nick));
  });

  socket.on('request default channels', () => {
    onRequestChannels.defaultChannels(socket);
  });

  socket.on('request user channels', () => {
    onRequestChannels.userChannels(socket);
  });

  socket.on('join channel', (channelId, callback) => {
    callback(onJoinChannel(socket, channelId));
  });

  socket.on('get user list', (channelId, callback) => {
    callback(onGetUserList(socket, channelId));
  });

});