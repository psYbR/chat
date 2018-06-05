import React from 'react';
import { connect } from 'react-redux';
import Alerts from './Alerts';
import ChannelListItem from './ChannelListItem';

const ChannelList = ({ channels, userInterface }) => {
    return (
        <div className={"leftSideContainer " + (userInterface.appIsBlurred ? " chatAppBlur" : '') /*Blur the app if the flag is set*/}>
            <Alerts />
            <div className="channelListContainer emphasised-container">
                {channels.map((channel) => {
                    return <ChannelListItem key={channel.channelId} { ...channel } />
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(ChannelList);