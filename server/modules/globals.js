config = require('../config');

//contains a list of users that are currently connected
let onlineUsers = [];

//contains a list of which channels online users have joined
let usersInChannels = [];

//contains user-created channels
let userChannels = [];

const log = (message, logImportance = 1) => {
  if (logImportance >= config.logLevel) {
    console.log(message);
  }
}

module.exports = {
  log,
  onlineUsers,
  usersInChannels,
  userChannels
}