import React from 'react';
import { connect } from 'react-redux';
import Alerts from './Alerts';
import ChannelListItem from './ChannelListItem';

class ChannelList extends React.Component {
    constructor(props) {
        super(props);
    }
    render = () => (
        <div className={"leftSideContainer " + (this.props.userInterface.appIsBlurred ? " chatAppBlur" : '') /*Blur the app if the flag is set*/}>
            <Alerts />
            <div className="channelListContainer emphasised-container">
                {this.props.channels.map((channel) => {
                    return <ChannelListItem key={channel.channelId} channel={channel} />
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(ChannelList);