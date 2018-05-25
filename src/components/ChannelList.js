import React from 'react';
import { connect } from 'react-redux';
import Alerts from './Alerts';
import ChannelListItem from './ChannelListItem';

const ChannelList = ({ currentChannels, activeChannel, configuration }) => {
    return (
        <div className={"leftSideContainer " + (!configuration.loggedIn ? " chatAppBlur" : '') /*Blur the app if the user isn't logged in*/}>
            <Alerts />
            <div className="channelListContainer emphasised-container">
                {currentChannels.map((channel) => {
                    return <ChannelListItem key={channel.id} { ...channel } />
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(ChannelList);