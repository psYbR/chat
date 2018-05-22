import React from 'react';
import { connect } from 'react-redux';
import messageHTMLify from '../utils/MessageHTMLify';
import { unixToTimestamp } from '../utils/dateUtils';

const ChatMessage = ({ id, source, type, timestamp, message, appliedFont, appliedColor }) => (
    <div className="chatMessageWrapper">

        <div className="chatMessageTimestampContainer">
            <p>{unixToTimestamp(timestamp, 2)}</p>
        </div>

        <div
            className={"chatMessageUsernameContainer " + (type == 'outbound' ? "chatMessageCurrentUser " : '') + (source == '*' ? 'chatMessageSystemUser' : '')}
        >
            <p className="pUserText">{source}</p>
        </div>

        <div
            className={"chatMessageTextContainer " + (type == 'outbound' ? "chatMessageCurrentUser " : '') + (source == '*' ? 'chatMessageSystemUser' : '')}
        >
            {messageHTMLify(message, 'pMessageText')}
        </div>

    </div>
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