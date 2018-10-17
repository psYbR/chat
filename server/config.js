//
//  configuration for blazechat server
//

const nickMinLength = 3;
const nickMaxLength = 20;
const messageMaxLength = 510;
const pingTimeout = 5000; //milliseconds
const pingInterval = 3000; //milliseconds
const maxHttpBufferSize = 1800000; //1800kb
const logLevel = 1; // 1 = all messages, 2 = error messages and chat messages only, 3 = chat messages only, 4 = no logging
const maxIPLogAge = 28; //days
const antiFloodTime = 5000; //ms to keep track of messages
const antiFloodFrequency = 4; //max number of messages can be sent within the above timeframe
const antiFloodMatchTime = 15000; //ms to keep track of matching messages (the same text)
const antiFloodMatches = 3; //max number of repeats in the above timeframe
const antiFloodMaxViolations = 3; //max number of times a user can violate the antiflood limits before being banned
const sessionExpiry = 30; //minutes

//the default object for a channel
const defaultChannel = {
  channelId: 0,
  channelName: '',
  topic: '',
  //isSelected: false,
  requireVoice: false,
  requireRegisteredNick: false,
  isVisible: true //visible in listings or not? mainly applicable to user-created channels
}

const rootDirectory = __dirname;

module.exports = {
  antiFloodMaxViolations,
  antiFloodMatches,
  antiFloodMatchTime,
  antiFloodTime,
  antiFloodFrequency,
  logLevel,
  rootDirectory,
  defaultChannel,
  nickMinLength,
  nickMaxLength,
  messageMaxLength,
  pingTimeout,
  pingInterval,
  maxHttpBufferSize,
  sessionExpiry,
  maxIPLogAge
};

/*
'lobby', 'Welcome to the lobby'
'help', 'Join this channel to get help using Chat App'
'technology', 'for discussion of all things tech-related'
'music', 'for discussion of all things music'
'movies', 'for discussion of all things movies'
'tv', 'for discussion of all things TV'
'software', 'for discussion of all things software'
'games', 'for discussion of all things games'
'consoles', 'for discussion of all things consoles'
'retro', 'for discussion of all things retro tech'
'art', 'for discussion of all things art'
'photography', 'for discussion of all things photography'
'drones', 'for discussion of all things related to drones'
'travel', 'for discussion of all things travel'
'news', 'for discussion of all things related to world news'
'melbourne', 'people from melbourne, gather here'
'sydney', 'people from sydney, gather here'
'perth', 'people from perth, gather here'
'brisbane', 'people from brisbane, gather here'
'nz', 'people from new zealand, gather here'
*/