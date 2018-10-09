io                    = require('./modules/server')
admin                 = require('./modules/onAdmin')
globals               = require('./modules/globals')
getIpAddress          = require('./modules/getIPAddress')
session               = require('./modules/sessions')

onDisconnect          = require('./modules/onDisconnect')
onLogin               = require('./modules/onLogin')
onCreateAccount       = require('./modules/onCreateAccount')
onRequestLeaveChannel = require('./modules/onRequestLeaveChannel')
onRequestChannels     = require('./modules/onRequestChannels')
onJoinChannel         = require('./modules/onJoinChannel')
onRequestUserList     = require('./modules/onRequestUserList')
onChatMessage         = require('./modules/onChatMessage')

//called whenever a client connects (or reconnects)
io.on('connection', (socket) => {

  globals.log("(index) Connection from: " + getIpAddress(socket));

  onDisconnect          .onConnect(socket)
  session               .onConnect(socket)
  onLogin               .onConnect(socket)
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


/*

| App Start |

-- Does the server think I'm logged in already?
|
|-- Yes 
|   |-- Get session details from server and set up client state
|
|-- No
|   |-- Prompt User for login

| App Reconnected |

-- Does the server think I'm logged in already?
|
|-- Yes
|   |-- Get session details from server and restore client state
|
|-- No
|   |-- Prompt User for login


*/