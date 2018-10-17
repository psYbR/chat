io                    = require('./modules/server')
admin                 = require('./modules/onAdmin')
globals               = require('./modules/globals')
IPAddress             = require('./modules/IPAddress')
session               = require('./modules/sessions')

onDisconnect          = require('./modules/onDisconnect')
onLogin               = require('./modules/onLogin')
onLoginCreate         = require('./modules/onLoginCreate')
onCreateAccount       = require('./modules/onCreateAccount')
onRequestLeaveChannel = require('./modules/onRequestLeaveChannel')
onRequestChannels     = require('./modules/onRequestChannels')
onJoinChannel         = require('./modules/onJoinChannel')
onRequestUserList     = require('./modules/onRequestUserList')
onChatMessage         = require('./modules/onChatMessage')

//called whenever a client connects (or reconnects)
io.on('connection', (socket) => {

  IPAddress             .onConnect(socket)
  onDisconnect          .onConnect(socket)
  session               .onConnect(socket)
  onLogin               .onConnect(socket)
  onLoginCreate         .onConnect(socket)
  onCreateAccount       .onConnect(socket)
  onRequestLeaveChannel .onConnect(socket)
  onRequestChannels     .onConnect(socket)
  onJoinChannel         .onConnect(socket)
  onRequestUserList     .onConnect(socket)
  onChatMessage         .onConnect(socket)
  admin                 .onConnect(socket)

  socket.conn.on('packet', function (packet) {
    if (packet.type === 'ping') {
      const session = globals.sessions.filter(session=>session.socketId == socket.id);
      if (session.length > 0) {
        //console.log('received ping from ' + session[0].sessionId);
      }
    }
  });

});
