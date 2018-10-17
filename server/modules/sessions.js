
var db = require('./database');
const SHA2 = require("sha2");
globals = require('./globals');

const ignoreSessions = true

const getUniqueKey = (socketId) => {
  return SHA2["SHA-256"](socketId).toString("hex");
}

//regularly drops sessions that are expired
const updateSessions = () => {
  +new Date;
  let now = Date.now();
  //get rid of sessions from the live table if they are expired
  globals.sessions = globals.sessions.filter(session => session.expiryDatetime > now)
  //globals.log("(session) Sessions purged from Globals.")
  //get rid of sessions from the DB table if they are expired
  db.query("DELETE FROM sessions WHERE expiryDatetime < NOW()", (err, result) => {
    if (err) throw err;
    //globals.log("(session) Sessions purged from DB."); 
  });
}
setInterval(updateSessions,10000)

//checks if a session is current and not expired
const checkSession = (socket, sessionKey) => {
  let response = '';
  //if session was found
  if (globals.sessions.filter(session=>session.sessionKey==sessionKey).length>0 && !ignoreSessions) {

    //create date vars
    +new Date;
    const expiryDatetime = Date.now() + (config.sessionExpiry * 60 * 1000);
    const now = Date.now();

    //update the session history table
    db.query("UPDATE sessions SET lastSocketId=?, lastActiveDatetime=?, expiryDatetime=? WHERE sessionKey=?",
      [socket.id, globals.getSQLDate(now), globals.getSQLDate(expiryDatetime), sessionKey],  (err, result) => {
      if (err) throw err;
      globals.log("(session) Existing session found and updated."); 
    });

    //update the live table
    globals.sessions = globals.sessions.map((session)=>{
      if (session.sessionKey == sessionKey) {
        return {
          ...session,
          expiryDatetime,
          socketId: socket.id
        }
      } else {
        return session
      }
    })

    const userDetails = globals.sessions.filter(session=>session.sessionKey==sessionKey)[0]

    db.query("SELECT * FROM users WHERE userId=?",[userDetails.lastUserId], (err, result) => {
      if (err) throw err;

      let isAdmin = 0;
      let loggedIn = false; //only set this to true if the user was registered (not for guests)

      //if there was a user record
      if (result.length > 0) {
        globals.log('(session) User account found for existing session')
        if (result[0].isGlobalBanned) {
          socket.disconnect(); //if the user is banned, drop them like a hot potato
        } else {
          isAdmin = result[0].isAdmin
          loggedIn = true
        }
      } else {
        globals.log('(session) No user account found for existing session.')
      }

      let channels = {};

      let loginObject = {
        isAdmin,
        nick: userDetails.lastNick,
        channels,
        loggedIn
      }

      //restore the user's previous login state
      io.to(socket.id).emit('login restore', loginObject);
      globals.addToOnlineUsers(socket.id, loginObject.nick) //add to online-users array

    })    

    response = "success";

  } else {
    globals.log("(session) Session '" + sessionKey + "' not found.")
    response = "no session";
  }
  return response;
}

//creates a new session
const createSession = (socket) => {
  let response = getUniqueKey(socket.id);
  globals.log("(session) Created session: " + getUniqueKey(socket.id));
  +new Date;
  const expiryDatetime = Date.now() + (config.sessionExpiry * 60 * 1000);
  const now = Date.now();
  const newSession = {
    sessionKey: response,
    socketId: socket.id,
    lastNick: '',
    lastUserId: 0,
    expiryDatetime
  }
  globals.sessions.push(newSession)

  db.query("INSERT INTO sessions (sessionKey, lastSocketId, lastActiveDatetime, expiryDatetime, lastNick, lastUserID) VALUES (?,?,?,?,'',0)",
    [response, socket.id, globals.getSQLDate(now), globals.getSQLDate(expiryDatetime)],  (err, result) => {
    if (err) throw err;
    globals.log("(session) New session created."); 
  });

  return response;
}

//add the login info onto the session object when a user logs in
const sessionLogin = (socketId, userId, nick) => {
  //create date vars
  +new Date;
  const expiryDatetime = Date.now() + (config.sessionExpiry * 60 * 1000);
  const now = Date.now();

  //console.log("about to update session with info: " + nick + ', ' + socketId + ', ' + userId + ', ' + sessionKeyFromSocketId(socketId))

  //update the session live table
  globals.sessions = globals.sessions.map((session)=>{
    if (session.sessionKey == sessionKeyFromSocketId(socketId)) {
      return {
        ...session,
        lastNick: nick,
        expiryDatetime,
        lastUserId: userId
      }
    } else {
      return session
    }
  })

  //update the session DB table
  db.query("UPDATE sessions SET lastNick=?, lastSocketId=?, lastUserId= ?, lastActiveDatetime=?, expiryDatetime=? WHERE sessionKey=?",
    [nick, socketId, userId, globals.getSQLDate(now), globals.getSQLDate(expiryDatetime), sessionKeyFromSocketId(socketId)],  (err, result) => {
    if (err) throw err;
    globals.log("(session) Session info updated for '" + nick + "', userId: " + userId);

  });
}

const socketIdFromSessionKey = (sessionKey) => {
  return globals.sessions.filter(session=>session.sessionKey = sessionKey)[0].socketId
}

const sessionKeyFromSocketId = (socketId) => {
  return globals.sessions.filter(session=>session.socketId = socketId)[0].sessionKey
}

const onConnect = (socket) => {
  socket.on('check session', (sessionKey, callback)=>{
    try {
      callback(checkSession(socket, sessionKey))
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
  onConnect,
  sessionLogin,
  socketIdFromSessionKey,
  sessionKeyFromSocketId
}