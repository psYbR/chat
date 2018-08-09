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

  //check the channel ID was a number
  let response = "success"
  if (isNaN(channelId)) {
    response = "invalid channel ID";
  }

  //check that the channel ID is in one of the channel lists
  response = "that channel was not found";
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

  //check that the user is actually in that channel
  response = "not in that channel";
  let thisUsersChannels = []; //keep track of which channels the user *is* in, we'll use this later on
  globals.usersInChannels.map((record)=>{
    if (record.channelId == channelId && record.socketId == socket.id) {
      response = "success";
    }
    if (record.socketId == socket.id) {
      thisUsersChannels.push(record.channelId);
    }
  })

  //check the permissions for the channel here

  //send the user the list of users in the channel
  if (response == "success") {

    //get the list of other users in the requested channel
    const userList = globals.usersInChannels.filter(record => record.channelId == channelId);

    //send each user to the client
    userList.map((record) => {      

      //send the object
      sendUserObject(socket.id, record.socketId, channelId);

    });

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
      globals.log('(index) Failed callback for onGetUserList: "' +  err + '" for client: ' + socket.id, 2)
    }
  });
}

module.exports = {
  onConnect
}