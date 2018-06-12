import React from 'react';
import { connect } from 'react-redux';
import ChannelDescription from './ChannelDescription';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import getVisibleMessages from '../selectors/getVisibleMessages';
import StyleModal from './StyleModal';
import { hideChannelList, showChannelList, hideUserList, showUserList } from '../actions/userInterfaceActions';

const ChatMainWindow = (state) => {
    return (
        <div className={"chatWindowContainer" + (state.userInterface.appIsBlurred ? " chatAppBlur" : '') /*Blur the app if the user isn't logged in*/}>

            <ChannelDescription channelTopic={state.channels.filter((channel) => {
                        return channel.channelId == state.userInterface.activeChannelId; //filter returns an array of all the objects that passed
                    })[0] ? state.channels.filter((channel) => {
                        return channel.channelId == state.userInterface.activeChannelId; //filter returns an array of all the objects that passed
                    })[0].topic : ''}
            />

            <div className="chatMessageOuterContainer emphasised-container">

                {state.userInterface.styleSelectionIsVisible && <StyleModal /> /* show the style modal if the button has been clicked */}

                <div className="channelsHideContainer" onClick={() => { //the button to show/hide the channel list
                    if (state.userInterface.channelListVisible) {
                        state.dispatch(hideChannelList());
                    } else {
                        state.dispatch(showChannelList());
                    }
                }}>
                    {state.userInterface.channelListVisible ? <i className="fa fa-caret-left"></i> : <i className="fa fa-caret-right"></i>}
                </div>

                <div className="usersHideContainer" onClick={() => { //the button to show/hide the users list
                    if (state.userInterface.userListVisible) {
                        state.dispatch(hideUserList());
                    } else {
                        state.dispatch(showUserList());
                    }
                }}>
                    {state.userInterface.userListVisible ? <i className="fa fa-caret-right"></i> : <i className="fa fa-caret-left"></i>}
                </div>

                <div className="chatMessageContainer">
                    <table className="chatMessageTable">
                        {state.channels.length < 1 ?
                            <tbody>
                                <tr className="chatMessageWrapper">
                                    <td className="chatMessageTimestampContainer">
                                        <p>[Not Applicable]</p>
                                    </td>
                        
                                    <td className="chatMessageUsernameContainer chatMessageSystemUser">
                                        <p className="pUserText">*</p>
                                    </td>
                        
                                    <td className="chatMessageTextContainer chatMessageSystemUser">
                                        <p className="pMessageText">No channels joined.</p>
                                    </td>
                                </tr>
                            </tbody>
                        :
                        //filter the visible messages according to the current channel and user configuration                        
                        getVisibleMessages(state).map((message) => {
                            return <ChatMessage key={message.timestamp} message={message} loginState={state.loginState} />
                        })}
                    </table>
                </div>

            </div>

            <ChatInput />

        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(ChatMainWindow);
