config = require('../config');
globals = require('./globals');
sendSystemMessage = require('./sendSystemMessage');
db = require('./database');

//
// called when the client requests to set their nick
//

const onLoginGuest = (socket, nick) => {

  globals.log("(onLoginGuest) Request to login with nick '" + nick + "'...")

  //check a nick was supplied with the request
  let response = "success";
  if (!nick) {
    response = "no nick supplied";
  } else {

    //check if another user has that nick already
    globals.onlineUsers.map((user)=>{

      //if the nick is in use
      if (user.nick == nick) { 
        //if it's the current user
        if (user.socketId == socket.id) { 
          response = "nick in use by socket";
        } else {
          response = "nick in use";
        }
      }

    })

    // db.query("SELECT Nick FROM users", (err, result) => {
    //   if (err) throw err;
    //   //console.log("Result:");
    //   //console.log(result);
    // });

    //check the length of the nick
    if (nick.length > config.nickMaxLength) {
      response = "nick too long";
    }
    if (nick.length < config.nickMinLength) {
      response = "nick too short";
    }
  }

  //if there was no error
  if (response == "success") {

    globals.log("(onGuestLogin) Nick '" + nick + "' accepted.")

    //add the user to the array of online users
    globals.onlineUsers.push({
      nick: nick,
      socketId: socket.id
    })

  }
  //send the response
  return(response);

}

const onConnect = (socket) => {
  socket.on('request login guest', (nick, callback) => {
    try {
      callback(onLoginGuest(socket, nick));
    } catch(err) {
      globals.log('(index) Failed callback for onSetNick: "' +  err + '" for client: ' + socket.id, 2)
    }
    
  });
}

module.exports = {
  onConnect
}
