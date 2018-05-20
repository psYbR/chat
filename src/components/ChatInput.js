import React from 'react';

const ChatInput = () => {
    return (
        <div className="chatInputContainer chatInputContainerActive emphasised-container">
            <button className="fontButton"><i className="fas fa-cog"></i></button>
            <form className="inputForm">
                <input
                    className="inputText"
                    type='text'
                    placeholder="Type a message you want to send, then press enter to send it."
                />
            </form>
        </div>
    );
}

export default ChatInput;