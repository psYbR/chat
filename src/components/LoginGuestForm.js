import React from 'react';
import { connect } from 'react-redux';
import socket from '../utils/handlers/client';
import { nickMinLength, nickMaxLength } from '../config.js';
import {
  setNick
} from '../actions/actions';
import { setAppReady } from '../utils/setAppState'
import requestJoinDefaultChannels from '../utils/handlers/requestJoinDefaultChannels';

class LoginGuestForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      termsAccepted: true,
      nick: '',
      waitingForNickAcceptance: false,
      nickSetFailedReason: ''
    }
    this.timer = null
  }
  handleLoginResponse = (response) => {
    if (response == "success") {

      this.setState({
        ...this.state,
        waitingForNickAcceptance: false,
        nickSetFailedReason: ''
      })

      this.props.dispatch(setNick(this.state.nick));
      requestJoinDefaultChannels();

      //animate
      this.props.unmount()
      setTimeout(()=>{
        setAppReady();
      },150)
      

    } else {
      this.setState({
        ...this.state,
        waitingForNickAcceptance: false,
        nickSetFailedReason: response
      })
    }
  }
  componentDidMount = () => {
    socket.on('login guest response', this.handleLoginResponse);
  }
  componentWillUnmount = () => {
    socket.removeListener('login guest response', this.handleLoginResponse);
    clearTimeout(this.timer);
  }
  onTimer = () => {
    if (this.state.waitingForNickAcceptance) {
      this.setState({
        ...this.state,
        waitingForNickAcceptance: false,
        nickSetFailedReason: "no response from server"
      })
    }
  }
  onFormSubmit = (e) => {
    e.preventDefault();
    //sanity check the nick length
    if (this.state.nick.length < nickMaxLength && this.state.nick.length > nickMinLength) { 
      this.setState({
        ...this.state,
        waitingForNickAcceptance: true,
        nickSetFailedReason: ''
      })
      socket.emit('request login guest', this.state.nick);

      //timer
      this.timer = setTimeout(this.onTimer.bind(this), 5000)

    } else {
      this.setState({
        ...this.state,
        waitingForNickAcceptance: false,
        nickSetFailedReason: 'nick was invalid length'
      })
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

        <div className="terms-container">
          <p className={"terms-paragraph" + (this.props.configuration.lightTheme ? " p-light" : "")}>
            Accept <a href='/terms.html' className={this.props.configuration.lightTheme ? "a-light" : ""}>terms and conditions</a>?
          </p>
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={this.state.termsAccepted ? "checked" : ''}
              onChange={this.onAcceptTerms}
            />
            <span className="checkbox-checkmark"></span>
          </label>
        </div>

      </div>
    );
  };
}

export default connect(state=>state)(LoginGuestForm);