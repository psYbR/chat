import React from 'react';
import { setActiveChannel } from "../actions/userInterfaceActions";
import { setCurrentChannel } from "../actions/channelActions";
import { connect } from 'react-redux';

const ChannelListItem = ( { channel, dispatch } ) => (
    
    <div
        className= {"channelListChannelName " +
            (channel.isSelected ? 'channel-selected ' : '') + 
            (channel.isCurrent ? 'channel-current ' : '') +
            (channel.hasNewNotifs ? 'channel-new-notif ' : '') +
            (channel.hasNewMessages ? 'channel-new-message ' : '') +
            (channel.hasMention ? 'channel-mention ' : '') +
            (!channel.isJoined ? 'channel-not-joined ' : '')}
        onClick={() => {
            //the current channel is set in both the userInterface and channel state objects
            dispatch(setCurrentChannel(channel.channelId));
            dispatch(setActiveChannel(channel.channelId));
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