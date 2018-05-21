import React from 'react';
import { connect } from 'react-redux';
import messageHTMLify from '../utils/MessageHTMLify';
import { unixToTimestamp } from '../utils/dateUtils';

const ChatMessage = ({ id, source, timestamp, message, appliedFont, appliedColor }) => (
    <div className="chatMessageWrapper">

        <div className="chatMessageTimestampContainer">
            <p>{unixToTimestamp(timestamp, 2)}</p>
        </div>

        {//"chatMessageUsernameContainer " + (props.isUser ? 'chatMessageCurrentUser ' : ' ') + (props.isSystem ? 'chatMessageSystemUser' : ' ')
        }
        <div className='chatMessageUsernameContainer'>
            <p className="pUserText">{source}</p>
        </div>

        {//"chatMessageTextContainer " + (props.isUser ? 'chatMessageCurrentUser ' : ' ') + (props.isSystem ? 'chatMessageSystemUser' : ' ')
        }
        <div className="chatMessageTextContainer">
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