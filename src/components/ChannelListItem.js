import React from 'react';

const ChannelListItem = (
    {
        channelName,
        hasNewMessages,
        hasNewNotifs,
        hasMention,
        isCurrent,
        isSelected,
        isJoined,
        type
    }
) => (
    <div className= {"channelListChannelName " +
    (isSelected ? 'channel-selected ' : '') + 
    (isCurrent ? 'channel-current ' : '') +
    (hasNewNotifs ? 'channel-new-notif ' : '') +
    (hasNewMessages ? 'channel-new-message ' : '') +
    (hasMention ? 'channel-mention ' : '') +
    (!isJoined ? 'channel-not-joined ' : '')} >
        <p>
            { type == 'channel' && <i className="far fa-comments"></i> } 
            { type == 'user' && <i className="far fa-user "></i> }
            {channelName}
        </p>
    </div>
);

export default ChannelListItem;