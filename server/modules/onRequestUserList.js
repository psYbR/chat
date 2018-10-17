config = require('../config');
globals = require('./globals');
utils = require('./utils');
sendUserObject = require('./sendUserObject');
io = require('./server');

//
// called when the client requests a user list
//

// TO DO: check channel permissions
// TO DO: get user properties: isAway, isBlocked, group

const onRequestUserList = (socket, channelId) => {

  globals.log("(onRequestUserList) Request for user list for channel: '" + channelId + "' from socket: " + socket.id);

  let response = "success"

  //check the channel ID was a number
  if (isNaN(channelId)) {
    globals.log("(onRequestUserList) invalid channel ID");
    response = "invalid channel ID";
  }

  //check that the channel ID is in one of the channel lists
  if (globals.channels.filter(channel=>channel.channelId == channelId).length < 1) {
    globals.log("(onRequestUserList) that channel was not found");
    response = "that channel was not found";
  }

  //check that the user is actually in that channel
  if (globals.usersInChannels.filter(channel=>channel.channelId == channelId && channel.socketId == socket.id).length < 1) {
    globals.log("(onRequestUserList) can't get user list for channel the user is not in");
    response = "can't get user list for channel the user is not in";
  }

  //send the user the list of users in the channel
  if (response == "success") {

    globals.log("(onRequestUserList) Sending user channel list...");

    //check the permissions for the channel here

    //for each other user in the requested channel, send their details to the joining user
    globals.usersInChannels.map((user) => {
      if (user.channelId == channelId) {
        sendUserObject(socket.id, user.socketId, channelId);
      }
    })

    //tell the user's client all the objects are sent
    io.to(socket.id).emit('user list finished');

  }

  //send the response to the client
  return(response);

};

const onConnect = (socket) => {
  socket.on('request user list', (channelId, callback) => {
    try {
      callback(onRequestUserList(socket, channelId));
    } catch(err) {
      globals.log('(index) Failed callback for onRequestUserList: "' +  err + '" for client: ' + socket.id, 2)
    }
  });
}

module.exports = {
  onConnect
}