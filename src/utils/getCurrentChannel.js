import { store } from '../stores/store';

export default () => {
  const curChannelObj = store.getState().channels.filter(channel => channel.isCurrent)[0];
  let curChannelId = 0;
  if (curChannelObj && curChannelObj.channelId > 0 ) {
    curChannelId = curChannelObj.channelId;
  }
  return curChannelId;
};