import React from 'react';
import { connect } from 'react-redux';
import { selectUserChannel, deselectUserChannel } from '../actions/userChannelsActions';

class UserChannelPicker extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ChannelPickerWrapper">

        <div className="ChannelPickerTitleContainer">
            <h3>Select some channels to join</h3>
        </div>

        {this.props.userInterface.retreivingUserChannels && <p>retreiving user channels: {this.props.userChannels.length} of {this.props.userInterface.numberOfUserChannels}...</p>}
        {!this.props.userInterface.retreivingUserChannels && <p>finished retreiving user channels</p>}

        <div className="UCPContainer">
            <table>
                <tbody>
                    <tr>
                        <th>
                            Channel Name
                        </th>
                        <th>
                            Topic
                        </th>
                    </tr>
                    {this.props.userChannels.map((channel) => {
                        return (
                            <tr
                                className={"UCPChannel" + (channel.isSelected ? " UCPSelected" : '')}
                                key={channel.channelId}
                                onClick={() => {
                                    if (channel.isSelected) {
                                        this.props.dispatch(deselectUserChannel(channel.channelId));
                                    } else {
                                        this.props.dispatch(selectUserChannel(channel.channelId));
                                    }
                                }}
                            >
                                
                                <td>
                                    <i className="fas fa-comment-alt"></i>
                                    <p>{channel.channelName}</p>
                                </td>
                                <td>
                                    <p>{channel.topic}</p>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>            
        </div>

      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(UserChannelPicker);