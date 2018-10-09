
var db = require('./database');
const SHA2 = require("sha2");
globals = require('./globals');

const getUniqueKey = (socketId) => {
  return SHA2["SHA-256"](socketId).toString("hex");
}

const checkSession = (socket, sessionId) => {
  let response = '';

  //if session was found
  if (globals.sessions.filter(session=>session.sessionId==sessionId).length>0) {
    response = "success";
  } else {
    response = "no session";
  }
  return response;
}

const createSession = (socket) => {
  let response = getUniqueKey(socket.id);
  globals.log("(index) Created session: " + getUniqueKey(socket.id));
  +new Date;
  let expiryDatetime = Date.now() + (30 * 60 * 1000);
  globals.sessions.push({
    sessionId: response,
    socketId: socket.id,
    nick: '',
    userId: 0,
    expiryDatetime
  })
  return response;
}

const onConnect = (socket) => {
  socket.on('check session', (sessionId, callback)=>{
    try {
      callback(checkSession(socket, sessionId))
    } catch(err) {
      globals.log('(index) Failed to check session: "' +  err)
    }
  })
  socket.on('create session', (callback)=>{
    try {
      callback(createSession(socket));
    } catch(err) {
      globals.log('(index) Failed to create session: "' +  err)
    }
  })
}

module.exports = {
  onConnect
}