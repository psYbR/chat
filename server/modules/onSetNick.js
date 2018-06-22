const config = require('../config');
const utils = require('./utils');
const sendSystemMessage = require('./sendSystemMessage');

//
// called when the client requests to set their nick
//

const onSetNick = (socket, nick) => {

  console.log("Request to set nick '" + nick + "' from socket: " + socket.id)

  //check a nick was supplied with the request
  let error = "success";
  if (!nick) {
    error = "no nick supplied";
  } else {

    //check if another user has that nick already
    utils.onlineUsers.map((user)=>{

      //if the nick is in use
      if (user.nick == nick) { 
        //if it's the current user
        if (user.socketId == socket.id) { 
          error = "nick already set";
        } else {
          error = "that nick is in use";
        }
      }

    })

    //check the length of the nick
    if (nick.length > config.nickMaxLength) {
      error = "nick was too long";
    }
    if (nick.length < config.nickMinLength) {
      error = "nick was too short";
    }
  }

  //if there was no error
  if (error == "success") {

    console.log("Nick '" + nick + "' accepted for socket: " + socket.id)

    //if the user is changing their nick (ie. they already have a nick) drop them from the array first
    let wasExistingUser = false;
    let existingNick = '';
    utils.onlineUsers.map((user) => {

      if (user.socketId == socket.id) {
        console.log('User "' + user.nick + '" changed their nick to "' + nick + '".');
        wasExistingUser = true;
        existingNick = user.nick;
        onlineUsers.splice(i,1);
      }

    })

    //add the user to the array of online users
    utils.onlineUsers.push({
      nick: nick,
      socketId: socket.id
    })

    //set the text of the message that will get sent to the user's channels
    let messageText = nick + " joined the channel";
    if (wasExistingUser) {
      messageText = existingNick + ' changed their nick to ' + nick;
    }

    //get the channels this user is in and send a message
    utils.usersInChannels.map((record)=>{
      if (record.socketId == socket.id) {

        //send the message
        sendSystemMessage(record.channelId, messageText, socket.id);
        
      }
    });

  }

  //send the response
  return(error);

}

module.exports = onSetNick;
