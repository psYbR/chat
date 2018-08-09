import requestJoinChannel from './requestJoinChannel'
import {
  addChannel
} from '../../actions/actions';
import { store } from '../../stores/store';

//request to join default channels
export default () => {
  store.getState().defaultChannels.map((defaultChannel) => {
    if (defaultChannel.isSelected) {
      const joinedChannel = store.getState().channels.filter(channel => channel.channelId == defaultChannel.channelId)[0];
      if (!joinedChannel || !joinedChannel.isJoined) { //do a check first to make sure the channel isn't already joined
        // add the channel to the UI
        store.dispatch(addChannel({ channelId: defaultChannel.channelId, channelName: defaultChannel.channelName, topic: defaultChannel.topic }));
        // here, send the actual server request to join the channel
        requestJoinChannel(defaultChannel.channelId)
      }
    }
  });
}