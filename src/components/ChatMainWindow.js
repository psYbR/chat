import React from 'react';
import { connect } from 'react-redux';
import ChannelDescription from './ChannelDescription';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import getVisibleMessages from '../selectors/getVisibleMessages';
import { toggleUserList, toggleChannelList } from '../actions/configurationAction';

const ChatMainWindow = ({ channels, activeChannel, messages, configuration, dispatch }) => {
    return (
        <div className="chatWindowContainer">
            <ChannelDescription channelTopic={
                    //fuck this, seriously
                    channels.filter((channel) => {
                        return channel.id == activeChannel.id;
                    })[0].topic //filter returns an array of all the objects that passed
                }
            />
            <div className="chatMessageOuterContainer emphasised-container">

                <div className="channelsHideContainer" onClick={() => {
                    dispatch(toggleChannelList());
                }}>
                    {!configuration.channelListOpen ? <i className="fa fa-caret-right"></i> : <i className="fa fa-caret-left"></i>}
                </div>

                <div className="usersHideContainer" onClick={() => {
                    dispatch(toggleUserList());
                }}>
                    {!configuration.userListOpen ? <i className="fa fa-caret-left"></i> : <i className="fa fa-caret-right"></i>}
                </div>

                <div className="chatMessageContainer">
                    {messages.map((message) => {
                        return <ChatMessage key={message.id} { ...message } />
                    })}
                </div>
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
    channels: state.currentChannels,
    activeChannel: state.activeChannel,
    messages: getVisibleMessages(state),
    configuration: state.configuration,
    dispatch: state.dispatch
});
export default connect(mapStateToProps)(ChatMainWindow);
