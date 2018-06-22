const utils = require('./utils');
const sendSystemMessage = require('./sendSystemMessage');
var io = require('./server');

//
// called when the client disconnects
//

const onDisconnect = (socket, reason) => {

  //translate the reason into something more readable
  if (reason == 'transport error') {
    reason = 'connection closed';
  }

  //get the disconnect user's nick
  const nick = utils.socketToNick(socket.id);

  //set the text of the message to send to clients
  const messageText = nick + " has disconnected (" + reason + ")"
  console.log(nick + " (" + socket.id + ") has disconnected (" + reason + ")");

  //remove the user from the channels and send a notification to channels
  utils.usersInChannels.map((record, i)=>{
    if (record.socketId == socket.id) {

      //send a message to the channels they were in
      sendSystemMessage(record.channelId, messageText, socket.id)

      //notify user's clients who were in a channel with the user to remove the user from their user lists
      utils.usersInChannels.map((subrecord)=>{
        if (subrecord.channelId == record.channelId && subrecord.socketId != socket.id) {
          
          //send the event
          io.to(subrecord.socketId).emit('remove user', { userId: socket.id, channel: [subrecord.channelId] });

        }
      })

      //remove the record from the array
      utils.usersInChannels.splice(i,1);
    }
  })

  //remove the user from the list of online users
  utils.onlineUsers.map((user, i) => {
    if (user.socketId == socket.id) {

      //remove the record from the array
      utils.onlineUsers.splice(i,1);

    }
  })
}

module.exports = onDisconnect;