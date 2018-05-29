import React from 'react';
import { connect } from 'react-redux';
import { setInputFieldText } from '../actions/userInterfaceActions';
import { getNowUnix } from '../utils/dateUtils';
import { addMessage } from '../actions/messageActions';

class ChatInput extends React.Component {
    constructor(props) {
        super(props);
    }
    onSubmit = (e) => {
        e.preventDefault();
        const message = this.props.userInterface.inputFieldText;
        if (message && !(!message.replace(/\s/g, '').length)) {
            this.props.dispatch(setInputFieldText());
            this.props.dispatch(addMessage({ messageId: Math.floor(Math.random() * 20) + 100, type: 'outbound', channelId: this.props.userInterface.activeChannelId, timestamp: getNowUnix(), message: message }));
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
    render() {
        return (
        <div className="chatInputContainer chatInputContainerActive emphasised-container">
            <button className="fontButton"><i className="fas fa-cog"></i></button>
            <form className="inputForm" onSubmit={this.onSubmit}>
                <input
                    className="inputText"
                    type='text'
                    placeholder="Type a message you want to send, then press enter to send it."
                    value={this.props.userInterface.setInputFieldText || ''} //the input can't have an initial state of undefined or React will issue a warning
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