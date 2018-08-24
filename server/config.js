//
//  configuration for blazechat server
//

const nickMinLength = 3;
const nickMaxLength = 20;
const messageMaxLength = 510;
const pingTimeout = 5000; //milliseconds
const pingInterval = 3000; //milliseconds
const maxHttpBufferSize = 1800000; //1800kb
const logLevel = 2; // 1 = all messages, 2 = error messages and chat messages only, 3 = chat messages only, 4 = no logging
const antiFloodTime = 5000; //ms to keep track of messages
const antiFloodFrequency = 4; //max number of messages can be sent within the above timeframe
const antiFloodMatchTime = 15000; //ms to keep track of matching messages (the same text)
const antiFloodMatches = 3; //max number of repeats in the above timeframe
const antiFloodMaxViolations = 3; //max number of times a user can violate the antiflood limits before being banned

//the default object for a channel
const defaultChannel = {
  channelId: 0,
  channelName: '',
  topic: '',
  isSelected: false,
  requireVoice: false,
  requireRegisteredNick: false,
  isVisible: true //visible in listings or not? mainly applicable to user-created channels
}

//nah, well do this in a database so I don't have to tear my hair out writing a massive object
const channelPermissions = [
  //move to db
]

//todo: move these to a database
//the list of default channels that show up at the welcome screen
const defaultChannels = [
  { ...defaultChannel, channelId: 1, channelName: 'lobby', topic: 'Welcome to the lobby', isSelected: true },
  { ...defaultChannel, channelId: 2, channelName: 'help', topic: 'Join this channel to get help using Chat App' },
  { ...defaultChannel, channelId: 3, channelName: 'technology', topic: 'for discussion of all things tech-related' },
  { ...defaultChannel, channelId: 4, channelName: 'music', topic: 'for discussion of all things music' },
  { ...defaultChannel, channelId: 5, channelName: 'movies', topic: 'for discussion of all things movies' },
  { ...defaultChannel, channelId: 6, channelName: 'tv', topic: 'for discussion of all things TV' },
  { ...defaultChannel, channelId: 7, channelName: 'software', topic: 'for discussion of all things software' },
  { ...defaultChannel, channelId: 8, channelName: 'games', topic: 'for discussion of all things games' },
  { ...defaultChannel, channelId: 9, channelName: 'consoles', topic: 'for discussion of all things consoles' },
  { ...defaultChannel, channelId: 10, channelName: 'retro', topic: 'for discussion of all things retro tech' },
  { ...defaultChannel, channelId: 11, channelName: 'art', topic: 'for discussion of all things art' },
  { ...defaultChannel, channelId: 12, channelName: 'photography', topic: 'for discussion of all things photography' },
  { ...defaultChannel, channelId: 13, channelName: 'drones', topic: 'for discussion of all things related to drones' },
  { ...defaultChannel, channelId: 14, channelName: 'travel', topic: 'for discussion of all things travel' },
  { ...defaultChannel, channelId: 15, channelName: 'news', topic: 'for discussion of all things related to world news' },
  { ...defaultChannel, channelId: 16, channelName: 'melbourne', topic: 'people from melbourne, gather here' },
  { ...defaultChannel, channelId: 17, channelName: 'sydney', topic: 'people from sydney, gather here' },
  { ...defaultChannel, channelId: 18, channelName: 'perth', topic: 'people from perth, gather here' },
  { ...defaultChannel, channelId: 19, channelName: 'brisbane', topic: 'people from brisbane, gather here' },
  { ...defaultChannel, channelId: 20, channelName: 'nz', topic: 'people from new zealand, gather here' }
];

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
  defaultChannels,
  nickMinLength,
  nickMaxLength,
  messageMaxLength,
  pingTimeout,
  pingInterval,
  maxHttpBufferSize
};