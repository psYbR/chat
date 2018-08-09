import React from 'react';
import { connect } from 'react-redux';
import {
  setChannelModalVisible,
  setLeaveChannelModalVisible,
  setAdminModalVisible
} from '../actions/actions';

class ChannelControls extends React.Component {
  constructor(props) {
    super(props);
  }
  onAddChannel = () => {
    this.props.dispatch(setChannelModalVisible());
  }
  onLeaveChannel = () => {
    this.props.dispatch(setLeaveChannelModalVisible());
  }
  onCreateChannel = () => {
    //this.props.dispatch(showCreateChannelModal());
  }
  onAdminOpen = () => {
    this.props.dispatch(setAdminModalVisible());
  }
  render () {
    return (
      <div className={this.props.configuration.lightTheme ? "channelControlsContainer emphasised-container-light" : "channelControlsContainer emphasised-container"}>
        <button
          className="button-default button-channel-controls ccbJoin tooltip"
          onClick={this.onAddChannel}
        >
          <i className="fas fa-sign-in-alt"></i>
          <span className="tooltiptext">Join</span>
        </button>
        <button
          className="button-default button-channel-controls ccbLeave tooltip"
          onClick={this.onLeaveChannel}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span className="tooltiptext">Leave</span>
        </button>
        <button
          className="button-default button-channel-controls ccbCreate tooltip"
          onClick={this.onCreateChannel}
        >
          <i className="far fa-file"></i>
          <span className="tooltiptext">Create</span>
        </button>

        {this.props.loginState.nick == "Energizer" &&
          <button
            className="button-default button-channel-controls ccbAdmin"
            onClick={this.onAdminOpen}
          >A
          </button>}
      </div>
    );
  }
}

export default connect((state) => { return state; })(ChannelControls);