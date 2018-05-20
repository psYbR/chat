import React from 'react';
import AdminAlert from './AdminAlert';
import ChannelListItem from './ChannelListItem';

const ChannelList = () => {
    return (
        <div className="leftSideContainer">
            <AdminAlert />
            <div className="channelListContainer">
                <ChannelListItem key="1" channelName="channel1" isSelected={false} />
                <ChannelListItem key="2" channelName="anotherChannel" isSelected={false} />
                <ChannelListItem key="3" channelName="multirotors" isSelected={true} />
                <ChannelListItem key="4" channelName="hexchat" isSelected={false} />
                <ChannelListItem key="5" channelName="awesomechat" isSelected={false} />
                <ChannelListItem key="6" channelName="agey's chat room" isSelected={false} />
                <ChannelListItem key="7" channelName="baaaaaa sheep" isSelected={false} />
            </div>
        </div>
    );
}

export default ChannelList;