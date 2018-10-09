import React from 'react';
import {
  setCurrentChannel
  ,setChannelMessagesRead
} from "../actions/actions";
import { connect } from 'react-redux';
import { requestUserList } from '../utils/handlers/handleUserLists';

const ChannelListItem = ( { channel, dispatch, configuration } ) => (
  <div
    className= {"channelListChannelName " +
      //add classes to the channel list item as neccessary
      (channel.isCurrent ? (configuration.lightTheme ? 'channel-current channel-current-light' : 'channel-current') : '') + 
      ((channel.hasNewNotifs && !channel.hasNewMessages && !channel.hasNewMention) ? 'channel-new-notif ' : '') +
      ((channel.hasNewMessages && !channel.hasNewMention) ? 'channel-new-message ' : '') +
      (channel.hasNewMention ? 'channel-mention ' : '') +
      (!channel.isJoined ? 'channel-not-joined ' : '')}
    onClick={() => {
      //update the channel states when clicked
      dispatch(setCurrentChannel(channel.channelId));
      dispatch(setChannelMessagesRead(channel.channelId));
      requestUserList()
    }}
  >
    <p>
      { channel.type == 'channel' && <i className="far fa-comments"></i> } 
      { channel.type == 'user' && <i className="far fa-user "></i> }
      {channel.name}
    </p>
  </div>
);

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(ChannelListItem);