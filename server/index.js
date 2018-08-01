var io = require('./modules/server');
var admin = require('./modules/onAdmin');
globals = require('./modules/globals');

var getIpAddress      = require('./modules/getIPAddress');
var onDisconnect      = require('./modules/onDisconnect');
var onChatMessage     = require('./modules/onChatMessage');
var onLoginGuest         = require('./modules/onLoginGuest');
var onRequestChannels = require('./modules/onRequestChannels');
var onJoinChannel     = require('./modules/onJoinChannel');
var onRequestUserList = require('./modules/onRequestUserList');
var onRequestLeaveChannel = require('./modules/onRequestLeaveChannel');
var onLoginUser = require('./modules/onLoginUser');
var session = require('./modules/sessions');;

//called whenever a client connects (or reconnects)
io.on('connection', (socket) => {

  globals.log("(index) Connection from: " + getIpAddress(socket));

  socket.on('check session', (sessionId, callback)=>{
    try {
      callback(session.checkSession(socket, sessionId))
    } catch(err) {
      globals.log('(index) Failed to check session: "' +  err)
    }
  })

  socket.on('create session', (callback)=>{
    try {
      callback(session.createSession(socket));
    } catch(err) {
      globals.log('(index) Failed to create session: "' +  err)
    }
  })

  socket.on('request login user', (login) => {
    onLoginUser(socket, login);
  });

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

  socket.on('request login guest', (nick, callback) => {
    try {
      callback(onLoginGuest(socket, nick));
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
  socket.on('admin create channel', (channel) => {
    admin.onAdminCreateChannel(socket,channel);
  })
  socket.on('admin create database tables', (callback) => {
    callback(admin.dbCreateTables());
  })
  socket.on('admin create default admin user', (callback) => {
    callback(admin.dbCreateDefaultAdminUser());
  })

  socket.conn.on('packet', function (packet) {
    if (packet.type === 'ping') {
      const session = globals.sessions.filter(session=>session.socketId == socket.id);
      if (session.length > 0) {
        //console.log('received ping from ' + session[0].sessionId);
      }
      
    }
  });

});
