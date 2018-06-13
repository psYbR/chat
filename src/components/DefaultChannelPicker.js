import React from 'react';
import { connect } from 'react-redux';
import { selectDefaultChannel, deselectDefaultChannel } from '../actions/defaultChannelsActions';

class DefaultChannelPicker extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ChannelPickerWrapper">

        <div className="ChannelPickerTitleContainer">
            <h3>Select some channels to join</h3>
        </div>

        <div className="DCPContainer">
            {this.props.defaultChannels.map((channel) => {
                return (
                    <div
                        className={"DCPChannel" + (channel.isSelected ? " DCPSelected" : '')}
                        key={channel.channelId}
                        onClick={() => {
                            //temporarily disable the buttons
                            if (!this.props.loginState.loggedIn) { 
                                console.log('Channel selection disabled - lobby only for now. Once you have logged in you can join other channels through the settings modal but they won\'t work yet.');
                                return;
                            
                            }
                            if (channel.isSelected) {
                                this.props.dispatch(deselectDefaultChannel(channel.channelId));
                            } else {
                                this.props.dispatch(selectDefaultChannel(channel.channelId));
                            }
                        }}
                    >
                        <i className="fas fa-comment-alt"></i>
                        <p>{channel.channelName}</p>
                    </div>
                );
            })}
            
        </div>

      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DefaultChannelPicker);