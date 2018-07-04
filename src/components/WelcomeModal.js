import React from 'react';
import { connect } from 'react-redux';
import {
  setNick
  ,setTermsAccepted
  ,unsetTermsAccepted
  ,setWaitingForNickAcceptance
  ,unsetWaitingForNickAcceptance
  ,addChannel
  ,setNickSetFailedReason
  ,setLoggedIn
  ,unblurApp
  //,resetDefaultChannelSelections
} from '../actions/actions';
import DefaultChannelPicker from './DefaultChannelPicker';
import { nickMinLength, nickMaxLength } from '../config.js';
import requestSetNick from "../utils/handlers/requestSetNick";
import requestJoinChannel from '../utils/handlers/requestJoinChannel'

class WelcomeModal extends React.Component {
  constructor(props) {
    super(props);
  }
  onGuestNickSubmit = (e) => {
    e.preventDefault();

    //set the UI to wait for the server to confirm the nick was set
    this.props.dispatch(setWaitingForNickAcceptance());
    
    //send the request and pass in a function to handle the response
    requestSetNick((response) => {
      //handle the response (a string; either "success" or the reason the nick wasn't accepted eg. in use)
      if (response == "success") {
        console.log("setting nick succeeded!");
        this.props.dispatch(unblurApp());
        this.props.dispatch(setLoggedIn());
        this.props.dispatch(unsetWaitingForNickAcceptance()); //un-disable the buttons
        this.props.dispatch(setNickSetFailedReason('')); //update the UI and set the nick

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

        //this.props.dispatch(resetDefaultChannelSelections()); //reset the default channel selections
        
      } else {
        console.log("setting nick failed: " + response);
        this.props.dispatch(unsetWaitingForNickAcceptance());
        this.props.dispatch(setNickSetFailedReason(response)); //tell the UI that setting the nick failed
      }      
    });
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
                      this.props.userInterface.waitingForNickAcceptance
                     }
                  >
                    {/*change the text of the button to a loading icon*/!this.props.userInterface.waitingForNickAcceptance
                    ? "Start chatting" : <span className="fa fa-spinner fa-spin"></span>}
                  </button>
                </form>

                <div className="termsContainer">
                  <p className="termsParagraph">Accept <a href='/terms.html'>terms and conditions</a>?</p>
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