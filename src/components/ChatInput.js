import React from 'react';
import { connect } from 'react-redux';
import { maxMessageLength } from '../config.js';
import { setInputFieldText, showStyleModal, hideStyleModal, addMessage } from '../actions/actions';
import { getNowTimestamp, sendMessage, colorNameToRGB } from '../utils/utils';

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
        const message = this.props.userInterface.inputFieldText;
        if (message && !(!message.replace(/\s/g, '').length)) {
            this.props.dispatch(setInputFieldText());

            const outboundMsg = {
                source: this.props.loginState.nick, //remove and do this serverside
                channelId: this.props.userInterface.activeChannelId, //verify serverside
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
            sendMessage(outboundMsg);

        }
    }
    onMessageChange = (e) => {
        const message = e.target.value;
        if (message.length < maxMessageLength) {
            this.props.dispatch(setInputFieldText(message));
        }
    }
    handleKeyPress = (e) => {
        if (e.key == "ArrowUp") {
            console.log("up arrow pressed");
        }
    }
    onFontButtonClick = (e) => {
        if (this.props.userInterface.styleSelectionIsVisible) {
            this.props.dispatch(hideStyleModal());
        } else {
            this.props.dispatch(showStyleModal());
        }
    }
    render() {
        return (
        <div className="chatInputContainer chatInputContainerActive emphasised-container">
            <button
                className="fontButton"
                onClick={this.onFontButtonClick}
            ><i className="fas fa-cog"></i></button>
            <form className="inputForm" onSubmit={this.onSubmit}>
                <input
                    className="inputText"
                    type='text'
                    placeholder="Type a message you want to send, then press enter to send it."
                    value={this.props.userInterface.inputFieldText || ''} //the input can't have an initial state of undefined or React will issue a warning
                    onChange={this.onMessageChange}
                    onKeyDown={this.handleKeyPress}
                    style={
                        {fontFamily: this.props.configuration.defaultFont,
                        color: 'rgb(' + colorNameToRGB(this.props.configuration.defaultColor) + ')'}
                    }
                />
            </form>
        </div>
        );
    };  
}

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(ChatInput);