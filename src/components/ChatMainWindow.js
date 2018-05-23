import React from 'react';
import { connect } from 'react-redux';
import ChannelDescription from './ChannelDescription';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import getVisibleMessages from '../selectors/getVisibleMessages';

const ChatMainWindow = ({ messages }) => {
    return (
        
        <div className="chatWindowContainer">

            <ChannelDescription channelTopic={'Open and free discussion about RC multirotor (tri, quad, hex, octo)copter aircraft! From electronics to structural design, aerobatics to pilotage, and the embedded systems that piece it all together, all discussion is welcome so long as it is friendly and efficient'} />
            <div className="chatMessageContainer emphasised-container">
                
                {messages.map((message) => {
                    return <ChatMessage key={message.id} { ...message } />
                })}

            </div>
            <ChatInput />
        </div>
    );
}

//we need to pass in a function as the parameter to connect()
//the store state gets passed into that function as first argument
//the function needs to return an object which is passed to the component as props
//that is where we can get the info from the app state that is desired
const mapStateToProps = (state) => ({
    messages: getVisibleMessages(state)
});
export default connect(mapStateToProps)(ChatMainWindow);
