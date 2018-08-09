utils = require('./utils');
globals = require('./globals');
sendSystemMessage = require('./sendSystemMessage');
io = require('./server');

//
// called when the client disconnects
//

const onDisconnect = (socket, reason) => {

  globals.log("(onDisconnect) " + socket.id + " has disconnected: " + reason + ". Getting nick...");

  //translate the reason into something more readable
  if (reason == 'transport error') {
    reason = 'connection closed';
  }

  //get the disconnected user's nick
  const nick = utils.socketToNick(socket.id);

  //set the text of the message to send to clients
  const messageText = nick + " has disconnected (" + reason + ")"

  //notify users who were in a channel with the disconnecting user
  globals.usersInChannels.map((record)=>{
    if (record.socketId == socket.id) {
      globals.usersInChannels.map((subrecord)=>{
        if (subrecord.channelId == record.channelId && subrecord.socketId != socket.id) {
          //send the event
          globals.log("(onDisconnect) sending 'remove user' event...")
          io.to(subrecord.socketId).emit('remove user', socket.id);
        }
      })
    }
  })

  //notify users who were in a channel with the disconnecting user
  globals.usersInChannels.map((record)=>{
    if (record.socketId == socket.id) {
      sendSystemMessage(record.channelId, messageText, socket.id)
    }
  })

  //remove the user from the list of online users
  globals.usersInChannels = globals.usersInChannels.filter(record => record.socketId != socket.id)
  globals.onlineUsers = globals.onlineUsers.filter(user => user.socketId != socket.id)

  // globals.log("(onDisconnect) " + socket.id + " was removed from arrays. Result:");
  // globals.log(globals.usersInChannels);    
  // globals.log(globals.onlineUsers);    

}

const onConnect = (socket) => {
  socket.on('disconnect', (reason) => {
    try {
      onDisconnect(socket, reason);
    } catch(err) {
      globals.log('(index) Failed to call onDisconnect: "' +  err + '" for client: ' + socket.id, 2)
    }
  });
}

module.exports = {
  onConnect
}