config = require('../config');
globals = require('./globals');
sendSystemMessage = require('./sendSystemMessage');
db = require('./database');

const onLogin = (socket, loginObject) => {

  //socket.disconnect(); //do this if the user is banned

  if (loginObject && loginObject.type && (loginObject.type == 'guest' || loginObject.type == 'user')) {

    //if the login was for a guest
    if (loginObject.type == 'guest') {

      globals.log("(onLogin) Request to login guest from: '" + loginObject.nick + "'...")

      let response = "success";

      //TODO limit nick to alphanumeric characters

      //check a nick was supplied with the request
      if (!loginObject.nick || loginObject.nick.length > config.nickMaxLength || loginObject.nick.length < config.nickMinLength) {
        response = "no nick supplied, or nick too long or short"
      }

      //check the nick isn't in use
      if (globals.checkIfNickIsInUse(loginObject.nick)) {
        response = "nick is in use"
      }

      if (globals.checkIfNickIsRegistered(loginObject.nick)) {
        response = "nick is registered"
      }

      //if there were no errors thus far
      if (response == "success") {

        //check the nick isn't global banned
        db.query("SELECT * FROM users WHERE nick=? AND isGlobalBanned=1",[loginObject.nick], (err, result) => {
          if (err) throw err;
          if (result.length > 0) {
            //if the nick belongs to a banned user, drop them like a hot potato
            socket.disconnect();
          } else {
            io.to(socket.id).emit('login response', "success");
            globals.log("(onLogin): Guest login for '" + loginObject.nick + "' successful!")
          }

        });

      } else {
        io.to(socket.id).emit('login response', response);
        globals.log("(onLogin): Guest login: " + response)
      }     

    }
    
    //if the login was for a registered user
    else if (loginObject.type == 'user') {
      globals.log("(onLogin) Request to login user from: '" + loginObject.email + "'...")

      db.query("SELECT * FROM users WHERE email=? AND password=SHA2(?, 256)",[loginObject.email, loginObject.password], (err, result) => {

        if (err) throw err;
        if (result.length > 0) {
  
          if (result[0].isGlobalBanned) {
            //if the user is banned, drop them like a hot potato
            socket.disconnect();
          } else {
            globals.log("(onLogin) user '" + result[0].nick + "' successfully logged in!")
            io.to(socket.id).emit('login response', {response: "success", nick: result[0].nick});
          }
  
        } else {
          io.to(socket.id).emit('login response', {response: "Incorrect email address or password!", nick: ''});
        }

      })

    }

  } else {
    io.to(socket.id).emit('login response', "error - no loginObject or invalid loginObject.type received!");
    globals.log("(onLogin) no loginObject or invalid loginObject.type received!",2)
  }

}

const onConnect = (socket) => {
  socket.on('request login', (loginObject) => {
    onLogin(socket, loginObject);    
  });
}

module.exports = {
  onConnect
}
