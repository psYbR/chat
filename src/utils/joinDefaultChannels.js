import {
  unsetJoinDefaultChannels,
  resetDefaultChannelSelections,
  addChannel
  //joinChannel
} from '../actions/actions';
import requestJoinChannel from '../utils/handlers/requestJoinChannel';

//sends server request to join the default channels the user initially selected
export const requestToJoinDefaultChannels = (state, dispatch) => {
  dispatch(unsetJoinDefaultChannels()); //reset the state value that triggers this function call
  dispatch(resetDefaultChannelSelections()); //reset the selections
  //if none of the channels are "current" (the one the user is viewing), assign one channel to be current
  let setCurrent = true;
  if (state.channels.filter((channel) => channel.isCurrent == true).length === 0) {
    setCurrent = false;
  }
  state.defaultChannels.map((defaultChannel) => {
    if (defaultChannel.isSelected) {
      const joinedChannel = state.channels.filter((channel) => channel.channelId == defaultChannel.channelId)[0];
      if (!joinedChannel || !joinedChannel.isJoined) { //do a check first to make sure the channel isn't already joined
        if (!setCurrent) {
          dispatch(addChannel({ channelId: defaultChannel.channelId, channelName: defaultChannel.channelName, topic: defaultChannel.topic, isCurrent: true }));
          setCurrent = true;
        } else {
          dispatch(addChannel({ channelId: defaultChannel.channelId, channelName: defaultChannel.channelName, topic: defaultChannel.topic }));
        }
        // here, send the actual server request to join the channel
        requestJoinChannel(defaultChannel.channelId)
      }
    }
  });
}