import React from 'react';
import { connect } from 'react-redux';
import messageHTMLify from '../utils/MessageHTMLify';
import { unixToTimestamp } from '../utils/dateUtils';

const ChatMessage = ({ id, source, type, timestamp, message, appliedFont, appliedColor }) => (
    <tbody>
        <tr className="chatMessageWrapper">

            <td className="chatMessageTimestampContainer">
                <p>{unixToTimestamp(timestamp, 2)}</p>
            </td>

            <td
                className={"chatMessageUsernameContainer " + (type == 'outbound' ? "chatMessageCurrentUser " : '') + (source == '*' ? 'chatMessageSystemUser' : '')}
            >
                <p className="pUserText">{source}</p>
            </td>

            <td
                className={"chatMessageTextContainer " + (type == 'outbound' ? "chatMessageCurrentUser " : '') + (source == '*' ? 'chatMessageSystemUser' : '')}
            >
                {messageHTMLify(message, 'pMessageText')}
            </td>

        </tr>
    </tbody>
);

export default ChatMessage;

// const mapStateToProps = (state, ownProps) => {
//     console.log(ownProps);
//     return {
//         id: ownProps.id,
//         inboundMessages: state.inboundMessages
//     };
// };
// export default connect(mapStateToProps)(ChatMessage);