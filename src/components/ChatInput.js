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
    this.state = {
      imageUrl: '',
      messageHasImage: false,
      imageSize: 0
    }
  }
  componentDidMount = () => {
    document.onpaste = this.handleImagePaste
  }
  handleImagePaste = (event) => {
    // use event.originalEvent.clipboard for newer chrome versions
    let items = (event.clipboardData  || event.originalEvent.clipboardData).items;
    // find pasted image among pasted items
    let blob = null
    let imageSize = 0
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") === 0) {
        blob = items[i].getAsFile()
        imageSize = blob.size
      }
    }
    // load image if there is one on the clipboard
    if (blob !== null) {
      var reader = new FileReader()
      reader.onload = (event) => {
        document.getElementById("pastedImage").src = event.target.result
        document.getElementById("pastedImageContainer").style.display = 'initial'
        this.setState({
          imageUrl: event.target.result,
          messageHasImage: true,
          imageSize
        })
      }
      reader.readAsDataURL(blob)
    }
  }
  handleImageRemoveClick = () => {
    document.getElementById("pastedImage").src = '';
    document.getElementById("pastedImageContainer").style.display = 'none';
    this.setState({
      ...this.state,
      imageUrl: '',
      messageHasImage: false,
      imageSize: 0
    })
  }
  onSubmit = (e) => {
    e.preventDefault();
    //check the user is in a channel before doing anything, and that any pasted image isn't over the size limit
    if (this.props.channels.length > 0 && this.state.imageSize <= maxPastedImageSize) {
      const message = this.props.userInterface.chatMessageInput;
      if (message && !(!message.replace(/\s/g, '').length)) {
        this.props.dispatch(setChatMessageInput())
        const outboundMsg = {
          channelId: this.props.channels.filter(channel => channel.isCurrent)[0].channelId, //verify serverside
          messageText: message,
          appliedFont: this.props.configuration.defaultFont, //validate
          appliedColor: this.props.configuration.defaultColor, //validate
          sentTimestamp: getNowTimestamp(),
          messageHasImage: this.state.messageHasImage,
          imageUrl: this.state.imageUrl
        }

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
        this.handleImageRemoveClick();
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
    <div className={"chat-input-container chat-input-container-active" + (this.props.configuration.lightTheme ? " emphasised-container-light chat-input-container-light" : " emphasised-container")}>
      <button
        className="button-default button-font"
        onClick={this.onFontButtonClick}
      ><i className="fas fa-cog"></i></button>
      <form className="input-form" onSubmit={this.onSubmit}>
        
        <input
          className={"input-text" + (this.props.configuration.lightTheme ? " input-text-light" : "")}
          type='text'
          placeholder={!this.props.channels.length > 0 ? 'You are not in a channel.' : 'Type a message you want to send, then press enter to send it.'}
          value={this.props.userInterface.chatMessageInput || ''} //the input can't have an initial value of undefined or React will issue a warning
          onChange={this.onMessageChange}
          onKeyDown={this.handleKeyPress}
          disabled={!this.props.channels.length > 0 ? 'disabled' : ''}
          style={
            {fontFamily: this.props.configuration.defaultFont,
            color: 'rgb(' + colorNameToRGB(this.props.configuration.defaultColor, this.props.configuration.lightTheme) + ')'}
          }
        />

        <div className="pastedImageContainer" id="pastedImageContainer">
          <img id="pastedImage"></img>
          <div className="pastedImageX"
            onClick={this.handleImageRemoveClick}>
            <i className="fas fa-times"></i>
          </div>
        </div>

      </form>
    </div>
    );
  };  
}

export default connect(state=>state)(ChatInput);