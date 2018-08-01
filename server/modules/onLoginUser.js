utils = require('./utils');
globals = require('./globals');
config = require('../config');
io = require('./server');
db = require('./database');

const onLoginUser = (socket, login) => {

  if (login.email && login.email.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ )
      && login.password && login.password.length > 0) {
    db.query("SELECT * FROM users WHERE Email=? AND Password=SHA2(?, 256)",[login.email, login.password], (err, result) => {
      if (err) throw err;
      globals.log("(onLoginUser) '" + result[0].Nick + "' logged in");;
      if (result.length > 0) {
        io.to(socket.id).emit('login user response', {response: "success", nick: result[0].Nick });
      }
    });
  } else {
    io.to(socket.id).emit('login user response', {response: "missing username or password"});
  }

}
  
module.exports = onLoginUser;