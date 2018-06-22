const config = require('../config');

//
// contains common functions and globally used arrays
//

//TO DO: save/load userChannels from database
//TO DO: channel permissions
//TO DO: blocked users

//contains a list of users that are currently connected
var onlineUsers = [];

//contains a list of which channels online users have joined
var usersInChannels = [];

//contains user-created channels
var userChannels = [];

//a test value
userChannels.push({
  ...config.defaultChannel,
  channelId: 21,
  channelName: 'admin channel',
  topic: 'secret admin stuff'
});

//for a given socket ID, return the user's nick
const socketToNick = (socketId) => {
  const userObj = onlineUsers.filter(user => 
    user.socketId == socketId
  );
  if (userObj) {
    if (userObj[0]) {
      return userObj[0].nick;
    } else {
      console.log("(utils) couldn't find nick (e2) for socket: " + socketId);
      console.log(userObj);
      console.log("(utils) onlineUsers object:");
      console.log(onlineUsers);
      return "E:2 ";
      
    }
    
  } else {
    console.log("couldn't find nick (e1)");
    return "E:1 ";
  }
};

module.exports = {
  onlineUsers: onlineUsers,
  usersInChannels: usersInChannels,
  userChannels: userChannels,
  socketToNick: socketToNick
}