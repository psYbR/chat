var io = require('./modules/server');
var getIpAddress      = require('./modules/getIPAddress');
var onDisconnect      = require('./modules/onDisconnect');
var onChatMessage     = require('./modules/onChatMessage');
var onLoginGuest         = require('./modules/onLoginGuest');
var onRequestChannels = require('./modules/onRequestChannels');
var onJoinChannel     = require('./modules/onJoinChannel');
var onRequestUserList = require('./modules/onRequestUserList');
var onRequestLeaveChannel = require('./modules/onRequestLeaveChannel');
admin = require('./modules/onAdmin');
db = require('./modules/database');
const SHA2 = require("sha2");

let sessions = [];

/*
{
socketId: 1123123123
nick: 'abdefg'
userId: 123124

}
*/

const getUniqueKey = (socketId) => {
  return SHA2["SHA-256"](socketId).toString("hex");
}

//called whenever a client connects (or reconnects)
io.on('connection', (socket) => {

  globals.log("(index) Connection from: " + getIpAddress(socket));

  socket.on('check session', (sessionId, callback)=>{
    let response = '';

    //if session was found
    if (sessions.filter(session=>session.sessionId==sessionId).length>0) {
      response = "success";
    } else {
      response = getUniqueKey(socket.id);
      +new Date;
      let expiryDatetime = Date.now() + (30 * 60 * 1000);
      sessions.push({
        sessionId: response,
        socketId: socket.id,
        nick: '',
        userId: 0,
        expiryDatetime
      })
    }
    try {
      callback(response);
    } catch(err) {
      globals.log('(index) Failed to respond to session: "' +  err)
    }
  })

  socket.on('create session', (callback)=>{
    let response = getUniqueKey(socket.id);
    console.log("(index) Created session: " + getUniqueKey(socket.id));
    +new Date;
    let expiryDatetime = Date.now() + (30 * 60 * 1000);
    sessions.push({
      sessionId: response,
      socketId: socket.id,
      nick: '',
      userId: 0,
      expiryDatetime
    })
    try {
      callback(response);
    } catch(err) {
      globals.log('(index) Failed to respond to session: "' +  err)
    }
  })

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
      const session = sessions.filter(session=>session.socketId == socket.id);
      if (session.length > 0) {
        //console.log('received ping from ' + session[0].sessionId);
      }
      
    }
  });

});
