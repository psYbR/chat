import React from 'react';
import { connect } from 'react-redux';
import ChannelDescription from './ChannelDescription';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import getVisibleMessages from '../selectors/getVisibleMessages';
import StyleModal from './StyleModal';
import { toggleUserList, toggleChannelList } from '../actions/configurationActions';

const ChatMainWindow = ({ channels, messages, configuration, loginState, userInterface, dispatch }) => {
    return (
        <div className={"chatWindowContainer " + (!loginState.loggedIn ? " chatAppBlur" : '') /*Blur the app if the user isn't logged in*/}>

            <ChannelDescription channelTopic={
                    //fuck this, seriously
                    channels.filter((channel) => {
                        return channel.channelId == userInterface.activeChannelId;
                    })[0].topic //filter returns an array of all the objects that passed
                }
            />

            <div className="chatMessageOuterContainer emphasised-container">

                <div className="channelsHideContainer" onClick={() => { //the button to hide the channel list
                    dispatch(toggleChannelList());
                }}>
                    {!userInterface.channelListVisible ? <i className="fa fa-caret-right"></i> : <i className="fa fa-caret-left"></i>}
                </div>

                <div className="usersHideContainer" onClick={() => { //the button to hide the users list
                    dispatch(toggleUserList());
                }}>
                    {!userInterface.userListVisible ? <i className="fa fa-caret-left"></i> : <i className="fa fa-caret-right"></i>}
                </div>

                {!userInterface.styleSelectionIsVisible && <StyleModal />}

                <div className="chatMessageContainer">
                    <table className="chatMessageTable">
                        {messages.map((message) => {
                            return <ChatMessage key={message.messageId} message={message} loginState={loginState} />
                        })}
                    </table>
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
    channels: state.channels,
    userInterface: state.userInterface,
    messages: getVisibleMessages(state),
    configuration: state.configuration,
    loginState: state.loginState,
    dispatch: state.dispatch
});
export default connect(mapStateToProps)(ChatMainWindow);
