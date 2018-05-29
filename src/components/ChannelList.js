import React from 'react';
import { connect } from 'react-redux';
import Alerts from './Alerts';
import ChannelListItem from './ChannelListItem';

const ChannelList = ({ channels, loginState }) => {
    return (
        <div className={"leftSideContainer " + (!loginState.loggedIn ? " chatAppBlur" : '') /*Blur the app if the user isn't logged in*/}>
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