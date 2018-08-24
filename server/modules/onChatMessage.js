utils = require('./utils');
globals = require('./globals');
config = require('../config');
io = require('./server');
getChannelNameFromId = require('./getChannelNameFromId');

//returns friendly date string from a timestamp eg. '2018-06-24 10:37:21'
const getFriendlyFromTimestamp = (timestamp, format) => {
  const a = new Date(timestamp);
  const year = a.getFullYear();
  const month = (a.getMonth() + 1)  < 10 ? '0' + (a.getMonth() + 1) : (a.getMonth() + 1);
  const date = a.getDate() < 10 ? '0' + a.getDate() : a.getDate();
  const hour = a.getHours();
  const min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
  const sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
  const time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec;
  return time;
}

//
// called when the client sends a chat message
//

// TO DO: channel permissions check

const onChatMessage = (socket, msg) => {

  //copy the incoming message
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

  if (outgoing.messageHasImage) {
    //check channel message permissions
  }

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

  //check the count of messages sent within the anti-flood window
  +new Date;
  const curTime = Date.now();
  if (globals.userMessages.filter(
        message => message.socketId == socket.id &&
        message.timestamp > (curTime - config.antiFloodTime)
      ).length >= config.antiFloodFrequency) {
    response = "rate exceeded - please don't flood";
  }

  //check the count of repeated (same text) messages within a window
  if (globals.userMessages.filter(
        message => message.socketId == socket.id &&
        message.timestamp > (curTime - config.antiFloodMatchTime) &&
        message.messageText == outgoing.messageText
      ).length >= config.antiFloodMatches) {
    response = "repeats exceeded - please don't repeat";
  }
 
  // :)
  if (msg.messageText == "<puff the magic dragon>") {
    throw("cheeky exception");
  }

  // antiFloodMaxViolations

  //check channel message permissions here
  
  //if there were no errors
  if (response == "success") {

    
    //record the time the message was sent
    globals.userMessages.push({socketId: socket.id, timestamp: curTime, messageText: outgoing.messageText})
    //console.log(globals.userMessages);

    globals.log("[" + getFriendlyFromTimestamp(Date.now()) + "] #" + getChannelNameFromId(outgoing.channelId) + " " + outgoing.source + ": " + outgoing.messageText + "", 3);

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

const onConnect = (socket) => {
  socket.on('chat message', (msg, callback) => {
    try {
      callback(onChatMessage(socket, msg));
    } catch(err) {
      globals.log('(index) Failed callback for onChatMessage: "' +  err + '" for client: ' + socket.id, 2)
    }
  });
}

module.exports = {
  onConnect
}