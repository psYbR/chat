config = require('../config');
globals = require('./globals');
db = require('./database');
io = require('./server')

const onCreateAccount = (socket, account) => {
  let response = 'success'
  if (!account) {
    response = 'fail'
  }
  io.to(socket.id).emit('create account response', response);
}

//set up listeners here
const onConnect = (socket) => {
  socket.on('request create account',(account, callback)=>{
    try {
      callback(onCreateAccount(account))
    } catch(err) {
      globals.log('(index) Failed to respond to Create Account: "' +  err)
    }
  })
}

module.exports = {
  onConnect
}