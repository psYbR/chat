import React from 'react';
import { connect } from 'react-redux';
import {
  setNick,
  setTermsAccepted,
  unsetTermsAccepted,
  setWaitingForNickAcceptance
} from '../actions/actions';
import DefaultChannelPicker from './DefaultChannelPicker';
import { nickMinLength, nickMaxLength } from '../config.js';
import requestSetNick from "../utils/handlers/requestSetNick";

class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);
  }
  onGuestNickSubmit = (e) => {
    e.preventDefault();

    //set the UI to wait for the server to confirm the nick was set
    this.props.dispatch(setWaitingForNickAcceptance());
    
    //send the request
    requestSetNick(this.props.loginState.nick);
  }
  onGuestNickChange = (e) => {
    const nick = e.target.value;
    if (!nick || nick.match( /^[a-zA-Z0-9_-]*$/ )) {
      /* REGEX breakdown:
        a-z : any lowercase letter
        A-Z : any uppercase letter
        0-9 : any digit
        _ : underscore
        - : hyphen */
      this.props.dispatch(setNick(nick));
    }
  }
  render() {
    return (
      
      <div className="modalWrapper">
        <div className="modalBlurContainer">
        </div>
        <div className="modalOuterContainer">
            <div className="modalInnerContainer">

              <div className="tabContainer">
                <div className="guestTab tab tabSelected">
                  <h1>Guest</h1>
                </div>
                <div className="loginTab tab">
                  <h1>Login</h1>
                  <div className="loginTabBadges">
                    <i className="fas fa-envelope-square"></i>
                    <i className="fab fa-facebook-square"></i>
                    <i className="fab fa-google-plus-square"></i>
                  </div>
                </div>
              </div>

              <div className="guestNickEntry">
                <form className="guestNickInputForm" onSubmit={this.onGuestNickSubmit}>
                  {this.props.userInterface.nickSetFailedReason != '' ? <p className="nickSetFailedReason">{this.props.userInterface.nickSetFailedReason}</p> : ''}
                  <input 
                    className="guestNickInput"
                    type='text'
                    placeholder="Enter a nickname"
                    onChange={this.onGuestNickChange}
                    //the input can't have an initial state of undefined or React will issue a warning
                    value={this.props.loginState.nick || ''}
                    spellCheck="false"
                  />
                  <button
                    className='guestNickSubmitButton'
                    //check for conditions that would cause the button to be disabled
                    disabled={
                      !this.props.loginState.nick ||
                      this.props.defaultChannels.filter((channel) => channel.isSelected == true).length < 1 ||
                      !this.props.userInterface.termsAccepted ||
                      this.props.loginState.nick.length < nickMinLength ||
                      this.props.loginState.nick.length > nickMaxLength ||
                      this.props.userInterface.waitForNickAcceptance
                     }
                  >
                    {/*change the text of the button to a loading icon*/!this.props.userInterface.waitForNickAcceptance
                    ? "Start chatting" : <span className="fa fa-spinner fa-spin"></span>}
                  </button>
                </form>

                <div className="termsContainer">
                  <p className="termsParagraph">Accept <a href='#'>usage terms</a>?</p>
                  <label className="CheckBoxContainer">
                    <input
                      type="checkbox"
                      checked={this.props.userInterface.termsAccepted ? "checked" : ''}
                      onChange={() => {
                        if (this.props.userInterface.termsAccepted) { this.props.dispatch(unsetTermsAccepted()); }
                        else { this.props.dispatch(setTermsAccepted()); }
                      }}
                    />
                    <span className="CheckBoxCheckmark"></span>
                  </label>
                </div>

              </div>

              <div className="containerChannelPicker">
                <DefaultChannelPicker />
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

export default connect(mapStateToProps)(WelcomeModal);