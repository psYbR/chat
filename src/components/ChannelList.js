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
      <div className={"leftSideContainer " + (this.props.userInterface.appIsBlurred ? " chatAppBlur" : '') /*Blur the app if the flag is set*/}>
        <Alerts />
        <div className={this.props.configuration.lightTheme ? "channelListContainer emphasised-container-light" : "channelListContainer emphasised-container"}>
          {this.props.channels.map((channel) => {
            return <ChannelListItem key={channel.channelId} channel={channel} />
          })}
        </div>
        <ChannelControls />
      </div>
    );
  }
}

export default connect((state) => { return state; })(ChannelList);