utils = require('./utils');
globals = require('./globals');
config = require('../config');
io = require('./server');

//
// called when the client sends a chat message
//

// TO DO: channel permissions check

const onChatMessage = (socket, msg) => {

  //coping the incoming message
  let outgoing = {};
  for (var property in msg) {
    outgoing[property] = msg[property];
  }
  
  //get the date and assign it to the message
  +new Date;
  outgoing.receivedTimestamp = Date.now();
  outgoing.sentTimestamp = "";

  //grab the nickname associated with the source user and add it to the outgoing message (and also verify the user exists)
  let response = "nick not found";
  globals.onlineUsers.map((user) => {
    if (user.socketId == socket.id) {
      outgoing.source = user.nick;
      response = "success"
    }
  });

  //check the length of the message doesn't exceed the limit
  if (outgoing.messageText && outgoing.messageText.length > config.messageMaxLength) {
    response = "message exceeded maximum length";
  }

  //check the user is actually in the channel they're trying to send a message to
  if (
    globals.usersInChannels.filter(record => (
      record.channelId == outgoing.channelId && record.socketId == socket.id
    ))
    .length < 1
  ) {
    response = "user not found in target channel";
  }

  //check channel message permissions here
  
  //if there were no errors
  if (response == "success") {

    console.log("'" + outgoing.source + "' said: '" + outgoing.messageText + "'");

    //iterate users in channels
    globals.usersInChannels.map((record)=>{ 

      //filter recipients by people who are in the destination channel and who are not the sender
      if (record.channelId == outgoing.channelId && record.socketId != socket.id) {

        //send the message
        io.to(record.socketId).emit('chat message', outgoing);

      }

    });

  }

  //because for some reason msg.sentTimestamp is invalid syntax in the below line
  const timestamp = msg.sentTimestamp;

  //send the response to the sender
  return({ timestamp, response });

}

module.exports = onChatMessage;