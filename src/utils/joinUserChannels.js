import { unsetJoinUserChannels } from '../actions/userInterfaceActions';
import { addChannel, joinChannel } from '../actions/channelActions';
import { resetUserChannelSelections } from '../actions/userChannelsActions';

//sends server request to join the default channels the user initially selected
export const requestToJoinUserChannels = (state, dispatch) => {
  dispatch(unsetJoinUserChannels()); //reset the state value that triggers this function call
  dispatch(resetUserChannelSelections()); //reset the selections
  state.userChannels.map((userChannel) => {
    if (userChannel.isSelected) {
      const joinedChannel = state.channels.filter((channel) => channel.channelId == userChannel.channelId)[0];
      if (!joinedChannel || !joinedChannel.isJoined) { //do a check first to make sure the channel isn't already joined
        dispatch(addChannel({ channelId: userChannel.channelId, channelName: userChannel.channelName, topic: userChannel.topic })); //add the channel to the user's channel list

        // here, send the actual server request to join the channel
        // for eg. requestChannelJoin(channel.channelId);        

      }
    }
  });

  //for testing purposes (simulates joining the channel)
  setTimeout(() => {
    state.userChannels.map((channel) => {
      if (channel.isSelected) {
        dispatch(joinChannel(channel.channelId));
      }
    });
  }, 300);

}