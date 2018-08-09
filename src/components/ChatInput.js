import React from 'react';
import { connect } from 'react-redux';
import { maxMessageLength, maxPastedImageSize } from '../config.js';
import { 
  setChatMessageInput
  ,setStyleModalVisible
  ,unsetStyleModalVisible
  ,addMessage
  ,setPastedImageSize 
} from '../actions/actions';
import { getNowTimestamp, colorNameToRGB } from '../utils/utils';
import sendChatMessage from '../utils/handlers/sendChatMessage';

// to do:
//
//      message history when pressing up arrow
//

class ChatInput extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmit = (e) => {
    e.preventDefault();
    //check the user is in a channel before doing anything, and that any pasted image isn't over the size limit
    if (this.props.channels.length > 0 && this.props.userInterface.pastedImageSize <= maxPastedImageSize) {
      const message = this.props.userInterface.chatMessageInput;
      if (message && !(!message.replace(/\s/g, '').length)) {
        this.props.dispatch(setChatMessageInput());
        const outboundMsg = {
          channelId: this.props.channels.filter(channel => channel.isCurrent)[0].channelId, //verify serverside
          messageText: message,
          appliedFont: this.props.configuration.defaultFont, //validate
          appliedColor: this.props.configuration.defaultColor, //validate
          sentTimestamp: getNowTimestamp(),
        };

        //add the message to the UI but set it as not sent yet - the callback from sendMessage will set it as sent
        this.props.dispatch(addMessage(
          {
            ...outboundMsg,
            type: 'outbound',
            messageSent: false //this should be changed
          }
        ));

        //send the message via the socket
        sendChatMessage(outboundMsg);
      }
    }
  }
  onMessageChange = (e) => {
    const message = e.target.value;
    if (message.length < maxMessageLength) {
      this.props.dispatch(setChatMessageInput(message));
    }
  }
  handleKeyPress = (e) => {
    if (e.key == "ArrowUp") {
      console.log("up arrow pressed");
    }
  }
  onFontButtonClick = () => {
    if (this.props.userInterface.styleModalVisible) {
      this.props.dispatch(unsetStyleModalVisible());
    } else {
      this.props.dispatch(setStyleModalVisible());
    }
  }
  render() {
    return (
    <div className={this.props.configuration.lightTheme ? "chatInputContainer chatInputContainerActive emphasised-container-light" : "chatInputContainer chatInputContainerActive emphasised-container"}>
      <button
        className="button-default button-font"
        onClick={this.onFontButtonClick}
      ><i className="fas fa-cog"></i></button>
      <form className="inputForm" onSubmit={this.onSubmit}>
        
        <input
          className="inputText"
          type='text'
          placeholder={!this.props.channels.length > 0 ? 'You are not in a channel.' : 'Type a message you want to send, then press enter to send it.'}
          value={this.props.userInterface.chatMessageInput || ''} //the input can't have an initial value of undefined or React will issue a warning
          onChange={this.onMessageChange}
          onKeyDown={this.handleKeyPress}
          disabled={!this.props.channels.length > 0 ? 'disabled' : ''}
          style={
            {fontFamily: this.props.configuration.defaultFont,
            color: 'rgb(' + colorNameToRGB(this.props.configuration.defaultColor) + ')'}
          }
        />

        <div className="pastedImageContainer" id="pastedImageContainer">
          <img id="pastedImage"></img>
          <div className="pastedImageX"
            onClick={()=>{
              document.getElementById("pastedImage").src = '';
              document.getElementById("pastedImageContainer").style.display = 'none';
              this.props.dispatch(setPastedImageSize(0))
            }}>
            <i className="fas fa-times"></i>
          </div>
        </div>

      </form>
    </div>
    );
  };  
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(ChatInput);