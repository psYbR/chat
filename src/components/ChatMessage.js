import React from 'react';
import messageHTMLify from '../selectors/MessageHTMLify';

const ChatMessage = (props) => (
    <div className="chatMessageWrapper">

        <div className="chatMessageTimestampContainer">
            <p>[23:20:16]</p>
        </div>

        <div className={"chatMessageUsernameContainer " + (props.isUser ? 'chatMessageCurrentUser ' : ' ') + (props.isSystem ? 'chatMessageSystemUser' : ' ')}>
            <p className="pUserText">{props.userName}</p>
        </div>

        <div className={"chatMessageTextContainer " + (props.isUser ? 'chatMessageCurrentUser ' : ' ') + (props.isSystem ? 'chatMessageSystemUser' : ' ')}>
            {messageHTMLify(props.messageText, 'pMessageText')}
        </div>

    </div>
);

export default ChatMessage;