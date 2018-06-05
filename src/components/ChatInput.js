import React from 'react';
import { connect } from 'react-redux';
import { setInputFieldText, showStyleModal, hideStyleModal } from '../actions/userInterfaceActions';
import { getNowUnix } from '../utils/dateUtils';
import { addMessage } from '../actions/messageActions';
import { blurApp, unblurApp } from '../actions/userInterfaceActions';
import { colorNameToRGB } from '../utils/styleInfo';

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
    }
    onSubmit = (e) => {
        e.preventDefault();
        const message = this.props.userInterface.inputFieldText;
        if (message && !(!message.replace(/\s/g, '').length)) {
            this.props.dispatch(setInputFieldText());
            this.props.dispatch(addMessage(
                {
                    messageId: Math.floor(Math.random() * 20) + 100,
                    type: 'outbound',
                    channelId: this.props.userInterface.activeChannelId,
                    timestamp: getNowUnix(),
                    messageText: message,
                    appliedFont: this.props.configuration.defaultFont,
                    appliedColor: this.props.configuration.defaultColor
                }
            ));
        }
    }
    onMessageChange = (e) => {
        const message = e.target.value;
        this.props.dispatch(setInputFieldText(message));
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