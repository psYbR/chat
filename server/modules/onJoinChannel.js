const config = require('../config');
const utils = require('./utils');
const sendSystemMessage = require('./sendSystemMessage');
const sendUserObject = require('./sendUserObject');

//
// when the client requests to join a channel
//

// TO DO: check channel permissions
// TO DO: get user properties: isAway, isBlocked, group

const onJoinChannel = (socket, channelId) => {

  console.log("(onJoinChannel) Channel join request: '" + channelId + "' from socket: " + socket.id);

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
  utils.userChannels.map((channel)=>{
    if (channel.channelId == channelId) {
      response = "success";
    }
  });

  //check the permissions for the channel here

  //check if the user is already in the channel
  utils.usersInChannels.map((record)=>{
    if (record.channelId == channelId && record.socketId == socket.id) {
      response = "already in channel";
    }
  });

  //add the user to the channel
  if (response == "success") {

    //add the record to the array
    utils.usersInChannels.push({
      channelId: channelId,
      socketId: socket.id
    })

    //send a message to the users of the channel
    sendSystemMessage(channelId, utils.socketToNick(socket.id) + " has joined the channel", socket.id);

    //send the user object to everyone in the channel except the joining user
    utils.usersInChannels.map((record)=>{
      if (record.channelId == channelId && record.socketId != socket.id) {

        //sends the user object
        sendUserObject(record.socketId, socket.id, channelId);

      }
    })
    
  }

  //send the response
  return({ response, channelId });

};

module.exports = onJoinChannel;