import React from 'react';
import { setCurrentChannel ,setChannelMessagesRead } from "../actions/actions";
import { connect } from 'react-redux';
import { requestUserList } from '../utils/handlers/handleUserLists';

const ChannelListItem = ( { channel, dispatch, lightTheme } ) => (
  <div
    className= {"channelListChannelName" +
      //add classes to the channel list item as neccessary
      (channel.isCurrent ? ' channel-current' : '') +
      ((lightTheme && channel.isCurrent) ? ' channel-current-light' : '') + 
      ((channel.hasNotifs && !channel.hasMessages && !channel.hasMention) ? ' channel-new-notif' : '') +
      ((channel.hasMessages && !channel.hasMention) ? ' channel-new-message' : '') +
      (channel.hasMention ? ' channel-mention ' : '') +
      (channel.wasJoinedBeforeDisconnect ? ' channel-not-joined' : '')}
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
      {channel.channelName}
    </p>
  </div>
);

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(ChannelListItem);