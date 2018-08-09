import React from 'react';
import { connect } from 'react-redux';
import {
  hideLeaveChannelModal,
  setWaitingForLeaveChannelConfirmation
} from '../actions/actions';
import requestLeaveChannel from '../utils/handlers/requestLeaveChannel';

class LeaveChannelModal extends React.Component {
  constructor(props) {
    super(props);
  }
  onLeaveClick = () => {
    this.props.dispatch(setWaitingForLeaveChannelConfirmation());
    requestLeaveChannel(this.props.channels.filter(channel => channel.isCurrent)[0].channelId);
  }
  onStayClick = () => {
    this.props.dispatch(hideLeaveChannelModal());
  }
  render() {
    return (
      
      <div className="modal-wrapper">
        {/* <div className="modal-blur-container">
        </div> */}
        <div className="modal-outer-container leaveChannelOuterContainer">
            <div className="modal-inner-container leaveChannelContainer">

              <h3>Really leave channel '{this.props.channels.filter(channel => channel.isCurrent)[0] ? this.props.channels.filter(channel => channel.isCurrent)[0].channelName : ''}'?</h3>

              <div className="leaveChannelButtonContainer">
                <button className="buttonDefault lcbLeave"
                  onClick={this.onLeaveClick}
                  disabled={this.props.userInterface.waitingForLeaveChannelConfirmation}
                >Leave</button>

                <button className="buttonDefault lcbStay"
                  onClick={this.onStayClick}
                  disabled={this.props.userInterface.waitingForLeaveChannelConfirmation}
                >Stay</button>
              </div>

            </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(LeaveChannelModal);