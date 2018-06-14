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
                        className={"DCPChannel" + (channel.isSelected ? " DCPSelected" : '') + (this.props.userInterface.waitForNickAcceptance ? " DCPDisabled" : "")}
                        key={channel.channelId}
                        onClick={() => {
                            if (this.props.userInterface.waitForNickAcceptance) {
                                return; //don't do anything if waiting for nick acceptance
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