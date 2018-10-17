config = require('../config');
globals = require('./globals');

//
// contains common functions and globally used arrays
//

//TO DO: save/load userChannels from database
//TO DO: channel permissions
//TO DO: blocked users

//a test value
// globals.channels.push({
//   ...config.defaultChannel,
//   channelId: 21,
//   channelName: 'admin channel',
//   topic: 'secret admin stuff'
// });

//for a given socket ID, return the user's nick
const socketToNick = (socketId) => {
  const userObj = globals.onlineUsers.filter(user => 
    user.socketId == socketId
  );
  if (userObj) {
    if (userObj[0]) {
      return userObj[0].nick;
    } else {
      globals.log("(utils - socket2nick) couldn't find nick (E:2) for socket: " + socketId, 2);
      return "E:2 ";
      
    }
    
  } else {
    globals.log("(utils - socket2nick) couldn't find nick (E:1)", 2);
    return "E:1 ";
  }
};

module.exports = {
  socketToNick
}