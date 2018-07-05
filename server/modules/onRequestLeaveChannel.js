config = require('../config');
utils = require('./utils');
globals = require('./globals');
sendSystemMessage = require('./sendSystemMessage');

//
// when the client requests to leave a channel
//

const onRequestLeaveChannel = (socket, channelId) => {

  globals.log("(onRequestLeaveChannel) Channel leave request: '" + channelId + "' from socket: " + socket.id);

  //check the channel ID was valid
  let response = "success"
  if (isNaN(channelId)) {
    response = "invalid channel ID";
  }

  //check that the ID is in one of the channel lists
  response = "channel not found";
  config.defaultChannels.map((channel)=>{
    if (channel.channelId == channelId) {
      response = "success";
    }
  });
  globals.userChannels.map((channel)=>{
    if (channel.channelId == channelId) {
      response = "success";
    }
  });

  //check the permissions for the channel here

  //check if the user is in the channel
  response = "not in channel";
  globals.usersInChannels.map((record)=>{
    if (record.channelId == channelId && record.socketId == socket.id) {
      response = "success";
    }
  });

  response = "nick not found"
  globals.onlineUsers.map((record)=>{
    if (record.socketId == socket.id) {
      response = "success";
    }
  })

  //remove the user from the channel
  if (response == "success") {
    
    //remove the record from the array
    globals.usersInChannels = globals.usersInChannels.filter(record => record.socketId != socket.id && record.channelId != channelId);

    //send a message to the users of the channel
    sendSystemMessage(channelId, utils.socketToNick(socket.id) + " has left the channel", socket.id);

    //notify users who were in a channel with the disconnecting user
    globals.usersInChannels.map((record)=>{
      if (record.socketId == socket.id) {
        globals.usersInChannels.map((subrecord)=>{
          if (subrecord.channelId == record.channelId && subrecord.socketId != socket.id) {
            //send the event
            globals.log("(onRequestLeaveChannel) sending 'remove user' event...")
            io.to(subrecord.socketId).emit('remove user', socket.id);
          }
        })
      }
    })
    
  }
  else {
    globals.log("(onRequestLeaveChannel) Channel leave failed for '" + channelId + "': " + response, 2);
  }

  //send the response
  return({ response, channelId });

};

module.exports = onRequestLeaveChannel;