import React from 'react';
import { connect } from 'react-redux';
import { selectChannelInPicker, deselectChannelInPicker } from '../actions/channelActions';

class ChannelPicker extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (  //{this.props.configuration.lightTheme ? "-light" : ""}
              //{"" + (this.props.configuration.lightTheme ? " -light" : "")}
      <div className="ChannelPickerWrapper">

        <div className={"ChannelPickerTitleContainer" + (this.props.configuration.lightTheme ? " ChannelPickerTitleContainer-light" : "")}>
          <h3>Select some channels to join</h3>
        </div>

        {this.props.showDefaultChannels ?

          <div className={"DCPContainer" + (this.props.configuration.lightTheme ? " DCPContainer-light" : "")}>
          {this.props.channels.map((channel) => {
            if (channel.isDefault) {
              return (
                <div
                  className={"DCPChannel" + (channel.isSelectedInPicker ? " DCPSelected" : '') + (this.props.userInterface.waitForNickAcceptance ? " DCPDisabled" : "") + (this.props.configuration.lightTheme ? " DCPChannel-light" : "")}
                  key={channel.channelId}
                  onClick={() => {
                    if (this.props.userInterface.waitForNickAcceptance) {
                      return; //don't do anything if waiting for nick acceptance
                    }
                    if (channel.isSelectedInPicker) {
                      this.props.dispatch(deselectChannelInPicker(channel.channelId));
                    } else {
                      this.props.dispatch(selectChannelInPicker(channel.channelId));
                    }
                  }}
                >
                  <i className="fas fa-comment-alt"></i>
                  <p>{channel.channelName}</p>
                </div>
              );
            }
          })}
          </div>
        :
          <React.Fragment>

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
                  {this.props.channels.map((channel) => {
                    if (!channel.isDefault) {
                      return (
                        <tr
                          className={"UCPChannel" + (channel.isSelectedInPicker ? " UCPSelected" : '')}
                          key={channel.channelId}
                          onClick={() => {
                            if (channel.isSelectedInPicker) {
                              this.props.dispatch(deselectChannelInPicker(channel.channelId));
                            } else {
                              this.props.dispatch(selectChannelInPicker(channel.channelId));
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
                    }
                  })}
                </tbody>
              </table>            
            </div>

          </React.Fragment>
        }

      </div>
    );
  };
}

export default connect(state=>state)(ChannelPicker);