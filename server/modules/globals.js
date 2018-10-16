config = require('../config');

//stores active sessions
let sessions = [];

//contains a list of users that are currently connected
let onlineUsers = [];

const checkIfNickIsInUse = (nick) => {
  return onlineUsers.filter(user=>user.nick == nick).length > 0
}

const checkIfNickIsRegistered = (nick) => {
  db.query("SELECT * FROM users WHERE nick=?",[nick], (err, result) => {
    if (err) throw err;
    return (result.length > 0)
  });
}

//contains a list of which channels online users have joined
let usersInChannels = [];

//contains user-created channels
let userChannels = [];
let defaultChannels = [];

//contains chat message timestamps from users (used to track message frequency for anti-flood)
let userMessages = [];

const log = (message, logImportance = 1) => {
  if (logImportance >= config.logLevel) {
    console.log(message);
  }
}

module.exports = {
  sessions,
  userMessages,
  log,
  onlineUsers,
  usersInChannels,
  userChannels,
  defaultChannels,
  checkIfNickIsInUse,
  checkIfNickIsRegistered
}