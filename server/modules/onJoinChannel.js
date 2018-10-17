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

  //check the channel ID was valid
  let response = "success"
  if (isNaN(channelId)) {
    response = "invalid channel ID";
  }

  //check that the ID is in the channel list
  response = "channel not found";
  globals.channels.map((channel)=>{
    if (channel.channelId == channelId) {
      response = "success";
    }
  });

  //check whether the user can join the channel
   

  //the permissions the user has in the channel
  // let permissions = {
  //   isOwner: false, //can configure the channel and assign ops
  //   isOp: false, //can administer users in the channel
  //   isMod: false, //can kick/voice
  //   isVoice: false, //can send messages when flag is required
  //   isImage: false //can paste images when flag is required
  // }

  //check if the user is already in the channel
  globals.usersInChannels.map((record)=>{
    if (record.channelId == channelId && record.socketId == socket.id) {
      response = "already in channel";
      globals.log("(onJoinChannel) user was already in channel: " + channelId, 2);
    }
  });

  //make sure the user has a nick
  response = "(onJoinChannel) user's nick not found"
  globals.onlineUsers.map((record)=>{
    if (record.socketId == socket.id) {
      response = "success";
    }
  })

  //add the user to the channel
  if (response == "success") {
    
    //add the record to the array
    globals.usersInChannels.push({
      channelId: channelId,
      socketId: socket.id
    })

    //send a message to the users of the channel
    sendSystemMessage(channelId, utils.socketToNick(socket.id) + " has joined the channel", socket.id);

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
  return({ response, channelId, permissions });

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