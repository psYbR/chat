import React from 'react';

const ChannelListItem = (props) => (
    <div className= {"channelListChannelName " + (props.isSelected ? 'active-selection ' : ' ') } >
        <p><i className="far fa-comments"></i>{props.channelName}</p>
    </div>
);

export default ChannelListItem;