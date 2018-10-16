utils = require('./utils');
globals = require('./globals');
config = require('../config');
io = require('./server');
db = require('./database');

const onLoginCreate = (socket, request) => {

  if ( //validate the form data
    request.email && request.email.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ) &&
    request.nick && request.nick.length > config.nickMinLength && request.nick.length < config.nickMaxLength &&
    request.password  && request.password.length > 3
    ) {

    //check the user does not exist
    db.query("SELECT * FROM users WHERE Email=? OR Nick=?",[request.email, request.nick], (err, result) => {
      if (err) throw err;

      globals.log("(onLoginCreate) user tried to register an existing user's info")

      if (result.length > 0) {
        if (request.nick == result[0].Nick) {
          io.to(socket.id).emit('login create response', "that nick is already registered")
        } else if (request.email == result[0].Email) {
          io.to(socket.id).emit('login create response', "that email is already registered")
        }
      } else {

        db.query("INSERT INTO users (nick, isAdmin, email, password) VALUES (?, 0, ?, SHA2(?, 256))",[request.nick, request.email, request.password],  (err, result) => {
          if (err) throw err;
          console.log("User '" + request.nick + "', email '" + request.email + "' created!");

          io.to(socket.id).emit('login create response', "success")

        });

      }
    });

  } else {
    io.to(socket.id).emit('login create response', "server recieved invalid form data")
  }

}

const onConnect = (socket) => {
  socket.on('request create user', (request) => {
    onLoginCreate(socket, request);
  });
}
  
module.exports = {
  onConnect
}