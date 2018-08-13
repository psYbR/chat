import React from 'react';
import { connect } from 'react-redux';
import { messageHTMLify } from '../utils/MessageHTMLify';
import { getFriendlyFromTimestamp } from '../utils/dateUtils';
import { systemNick } from '../config';

const ChatMessage = ({ message , loginState, lightTheme }) => (
    
        <tr className="chatMessageWrapper">

            <td className="chatMessageTimestampContainer">
                {message.messageSent ? <p>{getFriendlyFromTimestamp(message.receivedTimestamp, 2)}</p> : <div className="fa fa-spinner fa-spin nicknameSpinner" />}
            </td>

            <td
                className={"chatMessageUsernameContainer " + (message.type == 'outbound' ? "chatMessageCurrentUser " : '') + (message.source == systemNick ? 'chatMessageSystemUser' : '')}
            >
                <p className="pUserText">{message.type=='inbound' ? message.source : loginState.nick}</p>
            </td>

            <td
                className={(lightTheme ? "chatMessageTextContainer-light " : "chatMessageTextContainer ") + (message.type == 'outbound' ? (lightTheme ? "chatMessageCurrentUser-light " : "chatMessageCurrentUser ") : '') + (message.source == systemNick ? 'chatMessageSystemUser' : '') }
            >
                {messageHTMLify(message.messageText, 'pMessageText', message.appliedFont, message.appliedColor, message.source, lightTheme)}
            </td>

        </tr>
    
);

export default ChatMessage;