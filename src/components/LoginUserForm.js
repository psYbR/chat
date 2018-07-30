import React from 'react';
import { connect } from 'react-redux';
import {
  setNick
  ,setUsername
  ,setTermsAccepted
  ,unsetTermsAccepted
  ,setWaitingForNickAcceptance
  ,unsetWaitingForNickAcceptance
  ,addChannel
  ,setNickSetFailedReason
  ,setLoggedIn
  ,unblurApp
  ,setLightTheme
  ,setDarkTheme
  ,setWelcomeModalVisibleTab
  ,setUsernameIsValidNick
  ,setUsernameIsValidEmail
  ,unsetUsernameIsValidNick
  ,unsetUsernameIsValidEmail
  //,resetDefaultChannelSelections
} from '../actions/actions';
import DefaultChannelPicker from './DefaultChannelPicker';
import { nickMinLength, nickMaxLength } from '../config.js';
import requestSetNick from "../utils/handlers/requestSetNick";
import requestJoinChannel from '../utils/handlers/requestJoinChannel'

class loginUserForm extends React.Component {
  constructor(props) {
    super(props);
  }
  onUsernameChange = (e) => {

    const username = e.target.value;
    this.props.dispatch(setUsername(username));
    
    //check if the username is a valid nick
    if (!username || username.match( /^[a-zA-Z0-9_-]*$/ )) {
      this.props.dispatch(setUsernameIsValidNick());
    } else {
      this.props.dispatch(unsetUsernameIsValidNick());
    }
     
    //check if the username is an email address
    if (!username || username.match( /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ )) {
      this.props.dispatch(setUsernameIsValidEmail());
    } else {
      this.props.dispatch(unsetUsernameIsValidEmail());
    }
  }
  render() {
    return (

      <div className="loginFormContainer">
        {(!this.props.loginState.username == '' &&
          (!this.props.loginState.usernameIsValidNick && !this.props.loginState.usernameIsValidEmail)) &&
          <p className="loginMessage">Please enter a valid nickname or email</p>}
        <input 
          className={"loginInput guestNickInput" + (this.props.configuration.lightTheme ? " guestNickInput-light" : "")}
          type='text'
          placeholder="nick or email"
          onChange={this.onUsernameChange}
          //the input can't have an initial state of undefined or React will issue a warning
          value={this.props.loginState.username || ''}
          spellCheck="false"
        />
        <input
          className={"loginInput guestNickInput" + (this.props.configuration.lightTheme ? " guestNickInput-light" : "")}
          type='password'
          placeholder="password"
          //onChange={this.onGuestNickChange}
          //the input can't have an initial state of undefined or React will issue a warning
          //value={this.props.loginState.nick || ''}
        />

        <div className="termsContainer">
          <p className={"termsParagraph" + (this.props.configuration.lightTheme ? " p-light" : "")}>Accept <a href='/terms.html' className={this.props.configuration.lightTheme ? "a-light" : ""}>terms and conditions</a>?</p>
          <label className="checkBoxContainer">
            <input
              type="checkbox"
              checked={this.props.userInterface.termsAccepted ? "checked" : ''}
              onChange={() => {
                if (this.props.userInterface.termsAccepted) { this.props.dispatch(unsetTermsAccepted()); }
                else { this.props.dispatch(setTermsAccepted()); }
              }}
            />
            <span className="checkBoxCheckmark"></span>
          </label>
          
        </div>

        <p className="loginMessage">
          <button
            className='loginButton'
            //check for conditions that would cause the button to be disabled
            disabled={!(this.props.loginState.usernameIsValidNick ||
              this.props.loginState.usernameIsValidEmail) ||
              !this.props.userInterface.termsAccepted ||
              this.props.loginState.username < nickMinLength //||
              //this.props.userInterface.waitingForLoginResponse
            }
          >
            {/*change the text of the button to a loading icon*/!this.props.userInterface.waitingForLoginResponse
            ? "Start chatting" : <span className="fa fa-spinner fa-spin"></span>}
          </button>
        </p>
      </div>
    );
  };
}

export default connect(state=>state)(loginUserForm);