import React from 'react';
import { connect } from 'react-redux';
import Alerts from './Alerts';
import ChannelListItem from './ChannelListItem';
import ChannelControls from './ChannelControls';

class ChannelList extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    return (
      <div className="leftSideContainer">
        <Alerts />
        <div className={this.props.configuration.lightTheme ? "channelListContainer emphasised-container-light" : "channelListContainer emphasised-container"}>
          {this.props.channels.map((channel) => {
            const displayChannel = {
              ...channel,
              lightTheme: this.props.configuration.lightTheme,
              dispatch: this.props.dispatch
            }
            if (channel.isJoined) {
              return <ChannelListItem key={channel.channelId} channel={displayChannel} />
            }
          })}
        </div>
        <ChannelControls />
      </div>
    );
  }
}

export default connect((state) => { return state; })(ChannelList);