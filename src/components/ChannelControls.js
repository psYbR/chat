import React from 'react';
import { connect } from 'react-redux';
import {
  showChannelModal,
  showLeaveChannelModal,
  setAdminModalIsVisible
} from '../actions/actions';

class ChannelControls extends React.Component {
  constructor(props) {
    super(props);
  }
  onAddChannel = () => {
    this.props.dispatch(showChannelModal());
  }
  onLeaveChannel = () => {
    this.props.dispatch(showLeaveChannelModal());
  }
  onCreateChannel = () => {
    //this.props.dispatch(showCreateChannelModal());
  }
  onAdminOpen = () => {
    this.props.dispatch(setAdminModalIsVisible());
  }
  render () {
    return (
      <div className="channelControlsContainer emphasised-container">
        <button
          className="buttonDefault channelControlsButton ccbJoin tooltip"
          onClick={this.onAddChannel}
        >
          <i className="fas fa-sign-in-alt"></i>
          <span className="tooltiptext">Join</span>
        </button>
        <button
          className="buttonDefault channelControlsButton ccbLeave tooltip"
          onClick={this.onLeaveChannel}
        >
          <i className="fas fa-sign-out-alt"></i>
          <span className="tooltiptext">Leave</span>
        </button>
        <button
          className="buttonDefault channelControlsButton ccbCreate tooltip"
          onClick={this.onCreateChannel}
        >
          <i className="far fa-file"></i>
          <span className="tooltiptext">Create</span>
        </button>

        {this.props.loginState.nick == "Energizer" &&
          <button
            className="buttonDefault channelControlsButton ccbAdmin"
            onClick={this.onAdminOpen}
          >A
          </button>}
      </div>
    );
  }
}

export default connect((state) => { return state; })(ChannelControls);