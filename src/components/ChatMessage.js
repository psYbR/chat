import React from 'react';
import { connect } from 'react-redux';
import { messageHTMLify } from '../utils/MessageHTMLify';
import { unixToTimestamp } from '../utils/dateUtils';

const ChatMessage = ({ message , loginState }) => (
    <tbody>
        <tr className="chatMessageWrapper">

            <td className="chatMessageTimestampContainer">
                <p>{unixToTimestamp(message.timestamp, 2)}</p>
            </td>

            <td
                className={"chatMessageUsernameContainer " + (message.type == 'outbound' ? "chatMessageCurrentUser " : '') + (message.source == '*' ? 'chatMessageSystemUser' : '')}
            >
                <p className="pUserText">{message.type=='inbound' ? message.source : loginState.nick}</p>
            </td>

            <td
                className={"chatMessageTextContainer " + (message.type == 'outbound' ? "chatMessageCurrentUser " : '') + (message.source == '*' ? 'chatMessageSystemUser' : '')}
            >
                {messageHTMLify(message.messageText, 'pMessageText', message.appliedFont, message.appliedColor, message.source)}
            </td>

        </tr>
    </tbody>
);

export default ChatMessage;