config = require('../config');
globals = require('./globals');
sendSystemMessage = require('./sendSystemMessage');
db = require('./database');

const onLogin = (socket, payload) => {

  //socket.disconnect(); //do this if the user is banned

  globals.log("(onLogin) Request to login from: '" + payload.identifier + "'...")

  let response = '';  

  if (payload.loginType == 'user') {
    db.query("SELECT * FROM users WHERE email=? AND password=SHA2(?, 256)",[payload.email, payload.password], (err, result) => {
      if (err) throw err;
      if (result.length > 0) {

        const record = result[0];
        console.log("User found:");
        console.log(record.nick)

        if (result[0].isGlobalBanned) {
          socket.disconnect();
        }

        response = "success"        

      } else {

        response = "fail"
        
      }

      //send the response
      io.to(socket.id).emit('login response', response);
      console.log("Response: " + response)
    })
  } else if (payload.loginType == 'guest') {

    //check a nick was supplied with the request
    if (!payload.nick || payload.nick.length > config.nickMaxLength || payload.nick.length < config.nickMinLength) {
      response = "invalid nick supplied"
    } else {
      response = "success"
    }
    
  } else {
    globals.log(payload.loginType);
  }

  /*
  //check a nick was supplied with the request
  if (!payload.nick) {
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

  */

}

const onConnect = (socket) => {
  socket.on('request login', (payload) => {
    onLogin(socket, payload);    
  });
}

module.exports = {
  onConnect
}
