globals = require('./globals');

const getChannelNameFromId = (channelId) => {
  globals.channels.map((channel)=>{
    if (channel.channelId == channelId) {
      return channel.channelName;
    }
  });
}

module.exports = getChannelNameFromId;