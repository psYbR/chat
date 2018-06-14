const defaultChannels = [
  { channelId: 1, channelName: 'lobby', topic: 'Welcome to the lobby', isSelected: true },
  { channelId: 2, channelName: 'help', topic: 'Join this channel to get help using Chat App' },
  { channelId: 3, channelName: 'technology', topic: 'for discussion of all things tech-related' },
  { channelId: 4, channelName: 'music', topic: 'for discussion of all things music' },
  { channelId: 5, channelName: 'movies', topic: 'for discussion of all things movies' },
  { channelId: 6, channelName: 'tv', topic: 'for discussion of all things TV' },
  { channelId: 7, channelName: 'software', topic: 'for discussion of all things software' },
  { channelId: 8, channelName: 'games', topic: 'for discussion of all things games' },
  { channelId: 9, channelName: 'consoles', topic: 'for discussion of all things consoles' },
  { channelId: 10, channelName: 'retro', topic: 'for discussion of all things retro tech' },
  { channelId: 11, channelName: 'art', topic: 'for discussion of all things art' },
  { channelId: 12, channelName: 'photography', topic: 'for discussion of all things photography' },
  { channelId: 13, channelName: 'drones', topic: 'for discussion of all things related to drones' },
  { channelId: 14, channelName: 'travel', topic: 'for discussion of all things travel' },
  { channelId: 15, channelName: 'news', topic: 'for discussion of all things related to world news' },
  { channelId: 16, channelName: 'melbourne', topic: 'people from melbourne, gather here' },
  { channelId: 17, channelName: 'sydney', topic: 'people from sydney, gather here' },
  { channelId: 18, channelName: 'perth', topic: 'people from perth, gather here' },
  { channelId: 19, channelName: 'brisbane', topic: 'people from brisbane, gather here' },
  { channelId: 20, channelName: 'nz', topic: 'people from new zealand, gather here' }
];

const nickMinLength = 3;
const nickMaxLength = 20;

module.exports = {
  defaultChannels: defaultChannels,
  nickMinLength: nickMinLength,
  nickMaxLength: nickMaxLength
};