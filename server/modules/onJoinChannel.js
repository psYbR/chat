config = require('../config');
utils = require('./utils');
globals = require('./globals');
sendSystemMessage = require('./sendSystemMessage');
sendUserObject = require('./sendUserObject');

//
// when the client requests to join a channel
//

// TO DO: check channel permissions
// TO DO: get user properties: isAway, isBlocked, group

const onJoinChannel = (socket, channelId) => {

  globals.log("(onJoinChannel) Channel join request: '" + channelId + "' from socket: " + socket.id);

  let response = "success"

  //check the channel ID was valid
  if (isNaN(channelId)) {
    globals.log("(onJoinChannel) invalid channel ID")
    response = "invalid channel ID";
  }

  //check that the ID is in the channel list
  if (globals.channels.filter(channel=>channel.channelId == channelId).length < 1) {
    globals.log("(onJoinChannel) channel not found")
    response = "channel not found";
  }

  //make sure the user has a nick because if we can't find it here they won't show up in channel lists
  if (globals.onlineUsers.filter(user=>user.socketId == socket.id).length < 1) {
    globals.log("(onJoinChannel) users nick not found")
    response = "user's nick not found"
  }

  //check if the user is already in the channel
  if (globals.usersInChannels.filter(user=>user.socketId == socket.id && user.channelId == channelId).length > 0) {
    globals.log("(onJoinChannel) user already in channel ID: " + channelId)
    response = "user already in channel ID: " + channelId;
  }

  //add the user to the channel
  if (response == "success") {

    //check whether the user has permission to join the channel here
    
    //add the record to the array
    globals.usersInChannels.push({
      channelId: channelId,
      socketId: socket.id
    })

    //send a message to the users of the channel
    sendSystemMessage(channelId, utils.socketToNick(socket.id) + " has joined the channel", socket.id);

    globals.log("(onJoinChannel) user successfully joined channel ID: " + channelId)

    //send the user object to everyone in the channel except the joining user
    globals.usersInChannels.map((record)=>{
      if (record.channelId == channelId && record.socketId != socket.id) {

        globals.log("(onJoinChannel) Sending '" + channelId + "' to '" + record.socketId + "'");

        //sends the user object
        sendUserObject(record.socketId, socket.id, channelId);

      }
    })
    
  }
  else {
    globals.log("(onJoinChannel) Channel join failed for '" + channelId + "': " + response, 2);
  }

  //send the response
  return({ response, channelId });

};

const onConnect = (socket) => {
  socket.on('join channel', (channelId, callback) => {
    try {
      callback(onJoinChannel(socket, channelId));
    } catch(err) {
      globals.log('(index) Failed callback for onJoinChannel: "' +  err + '" for client: ' + socket.id, 2)
    }
  });
}

module.exports = {
  onConnect
}