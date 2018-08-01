config = require('../config');

//stores active sessions
let sessions = [];

//contains a list of users that are currently connected
let onlineUsers = [];

//contains a list of which channels online users have joined
let usersInChannels = [];

//contains user-created channels
let userChannels = [];

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
  userChannels
}