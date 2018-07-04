globals = require('./globals');
config = require('../config');

const getChannelNameFromId = (channelId) => {
  //check that the ID is in one of the channel lists
  response = '';
  config.defaultChannels.map((channel)=>{
    if (channel.channelId == channelId) {
      response = channel.channelName;
    }
  });
  globals.userChannels.map((channel)=>{
    if (channel.channelId == channelId) {
      response = channel.channelName;
    }
  });
  return response;
}

module.exports = getChannelNameFromId;