import React from 'react';
import { connect } from 'react-redux';
import { messageHTMLify } from '../utils/MessageHTMLify';
import { getFriendlyFromTimestamp } from '../utils/dateUtils';

const ChatMessage = ({ message , loginState }) => (
    <tbody>
        <tr className="chatMessageWrapper">

            <td className="chatMessageTimestampContainer">
                {message.messageSent ? <p>{getFriendlyFromTimestamp(message.timestamp, 2)}</p> : <div className="fa fa-spinner fa-spin nicknameSpinner" />}
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