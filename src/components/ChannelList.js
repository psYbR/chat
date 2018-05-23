import React from 'react';
import { connect } from 'react-redux';
import Alerts from './Alerts';
import ChannelListItem from './ChannelListItem';

const ChannelList = ({ currentChannels, activeChannel }) => {
    return (
        <div className="leftSideContainer">
            <Alerts />
            <div className="channelListContainer emphasised-container">
                {currentChannels.map((channel) => {
                    return <ChannelListItem key={channel.id} { ...channel } />
                })}
            </div>
        </div>
    );
}

const mapStateToProps = ({ currentChannels, activeChannel }) => {
    console.log(currentChannels);
    return {
        currentChannels,
        activeChannel
    };
};
export default connect(mapStateToProps)(ChannelList);