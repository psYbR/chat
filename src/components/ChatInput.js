import React from 'react';
import { connect } from 'react-redux';
import { setTypingMessage } from '../actions/configurationAction';
import { addMessageToHistory } from '../actions/messageHistoryAction';
import { getNowUnix } from '../utils/dateUtils';
import { outboundMsgAction } from '../actions/outboundMsgAction';

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
    }
    onSubmit = (e) => {
        e.preventDefault();
        const message = this.props.configuration.typingMessage;
        if (message && !(!message.replace(/\s/g, '').length)) {
            this.props.dispatch(setTypingMessage());
            this.props.dispatch(outboundMsgAction({ id: Math.floor(Math.random() * 20) + 100, channelId: this.props.activeChannel.id, timestamp: getNowUnix(), message: message }));
            this.props.dispatch(addMessageToHistory(message));
        }
    }
    onMessageChange = (e) => {
        const message = e.target.value;
        this.props.dispatch(setTypingMessage(message));
    }
    handleKeyPress = (e) => {
        if (e.key == "ArrowUp") {
            console.log("up arrow pressed");
        }
    }
    render() {
        return (
        <div className="chatInputContainer chatInputContainerActive emphasised-container">
            <button className="fontButton"><i className="fas fa-cog"></i></button>
            <form className="inputForm" onSubmit={this.onSubmit}>
                <input
                    className="inputText"
                    type='text'
                    placeholder="Type a message you want to send, then press enter to send it."
                    value={this.props.configuration.typingMessage || ''} //the input can't have an initial state of undefined or React will issue a warning
                    onChange={this.onMessageChange}
                    onKeyDown={this.handleKeyPress}
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