import { unsetJoinDefaultChannels } from '../actions/userInterfaceActions';
import { addChannel, joinChannel } from '../actions/channelActions';
import { resetDefaultChannelSelections } from '../actions/defaultChannelsActions';

//sends server request to join the default channels the user initially selected
export const requestToJoinDefaultChannels = (state, dispatch) => {
  dispatch(unsetJoinDefaultChannels()); //reset the state value that triggers this function call
  dispatch(resetDefaultChannelSelections()); //reset the selections
  state.defaultChannels.map((defaultChannel) => {
    if (defaultChannel.isSelected) {
      //do a check first to make sure the channel isn't already joined
      const joinedChannel = state.channels.filter((channel) => channel.channelId == defaultChannel.channelId)[0];
      if (!joinedChannel || !joinedChannel.isJoined) {
        dispatch(addChannel({ channelId: defaultChannel.channelId, channelName: defaultChannel.channelName, topic: defaultChannel.topic }));

        // here, send the actual server request to join the channel
        // for eg. requestChannelJoin(channel.channelId);

        

      }
    }
  });

  //for testing purposes:
  setTimeout(() => {
    state.defaultChannels.map((channel) => {
      if (channel.isSelected) {
        dispatch(joinChannel(channel.channelId));
      }
    });
  }, 3000);

}