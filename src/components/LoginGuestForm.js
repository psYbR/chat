import React from 'react';
import { connect } from 'react-redux';
import {
  setNick
  ,addChannel
} from '../actions/actions';
import { nickMinLength, nickMaxLength } from '../config.js';
import requestJoinChannel from '../utils/handlers/requestJoinChannel'
import { setAppReady } from '../utils/setAppState'

import socket from '../utils/handlers/client';

class loginGuestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAccepted: true,
      nick: '',
      waitingForNickAcceptance: false,
      nickSetFailedReason: ''
    }
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    //sanity check the nick length
    if (this.state.nick.length > nickMaxLength || this.state.nick.length < nickMinLength) { 
      this.setState({
        ...this.state,
        waitingForNickAcceptance: false,
        nickSetFailedReason: 'nick was invalid length'
      })
    } else {
      this.setState({
        ...this.state,
        waitingForNickAcceptance: true,
        nickSetFailedReason: ''
      })
      socket.emit('request login guest', this.state.nick, (response) => {
        //handle the response (a string; either "success" or the reason the nick wasn't accepted eg. in use)
        if (response == "success") {
          this.setState({
            ...this.state,
            waitingForNickAcceptance: false,
            nickSetFailedReason: ''
          })
          this.props.dispatch(setNick(this.state.nick));
          setAppReady();
          this.props.defaultChannels.map((defaultChannel) => {
            if (defaultChannel.isSelected) {
              const joinedChannel = this.props.channels.filter(channel => channel.channelId == defaultChannel.channelId)[0];
              if (!joinedChannel || !joinedChannel.isJoined) { //do a check first to make sure the channel isn't already joined
                // add the channel to the UI
                this.props.dispatch(addChannel({ channelId: defaultChannel.channelId, channelName: defaultChannel.channelName, topic: defaultChannel.topic }));
                // here, send the actual server request to join the channel
                requestJoinChannel(defaultChannel.channelId)
              }
            }
          });
        } else {
          this.setState({
            ...this.state,
            waitingForNickAcceptance: false,
            nickSetFailedReason: response
          })
        }
      });
    }
  }
  onNickChange = (e) => {
    const nick = e.target.value;
    if (!nick || nick.match( /^[a-zA-Z0-9_-]*$/ )) {
      this.setState({
        ...this.state,
        nick: nick
      })
    }
  }
  onAcceptTerms = () => {
    this.setState({
      ...this.state,
      termsAccepted: !this.state.termsAccepted
    });
  }
  render() {
    return ( 

      <div className="guestNickEntry">
        <form className="guestNickInputForm" onSubmit={this.onFormSubmit}>

          {this.state.nickSetFailedReason != '' ? <p className="nickSetFailedReason">{this.state.nickSetFailedReason}</p> : ''}

          <input 
            className={"guestNickInput" + (this.props.configuration.lightTheme ? " guestNickInput-light" : "")}
            type='text'
            placeholder="Enter a nickname"
            onChange={this.onNickChange}
            //the input can't have an initial state of undefined or React will issue a warning
            value={this.state.nick || ''}
            spellCheck="false"
          />

          <button
            className='guestNickSubmitButton'
            //check for conditions that would cause the button to be disabled
            disabled={
              !this.state.nick ||
              this.props.defaultChannels.filter((channel) => channel.isSelected == true).length < 1 ||
              !this.state.termsAccepted ||
              this.state.nick.length < nickMinLength ||
              this.state.nick.length > nickMaxLength ||
              this.state.waitingForNickAcceptance
            }>
            {!this.state.waitingForNickAcceptance ? "Start chatting" : "Logging in... "}
            {this.state.waitingForNickAcceptance && <span className="fa fa-spinner fa-spin"></span>}
          </button>

        </form>

        <div className="termsContainer">
          <p className={"termsParagraph" + (this.props.configuration.lightTheme ? " p-light" : "")}>
            Accept <a href='/terms.html' className={this.props.configuration.lightTheme ? "a-light" : ""}>terms and conditions</a>?
          </p>
          <label className="checkBoxContainer">
            <input
              type="checkbox"
              checked={this.state.termsAccepted ? "checked" : ''}
              onChange={this.onAcceptTerms}
            />
            <span className="checkBoxCheckmark"></span>
          </label>
        </div>

      </div>
    );
  };
}

export default connect(state=>state)(loginGuestForm);