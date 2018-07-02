import React from 'react';
import { connect } from 'react-redux';
import ChannelTopic from './ChannelTopic';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import getVisibleMessages from '../selectors/getVisibleMessages';
import StyleModal from './StyleModal';
import { hideChannelList, showChannelList, hideUserList, showUserList } from '../actions/userInterfaceActions';
import { systemNick } from '../config';

const ChatMainWindow = (state) => {
  return (
    <div className={"chatWindowContainer" + (state.userInterface.appIsBlurred ? " chatAppBlur" : '') /*Blur the app if the user isn't logged in*/}>

      <ChannelTopic
        channelTopic={
            state.channels.filter(channel => channel.isCurrent)[0] //if the current channel is found
          ?
            state.channels.filter(channel => channel.isCurrent)[0].topic //use the topic
          : '' //otherwise leave it blank
        }
      />

      <div className="chatMessageOuterContainer emphasised-container">

        {state.userInterface.styleSelectionIsVisible && <StyleModal /> /* show the style modal if the button has been clicked */}

        <div className="channelsHideContainer"
          onClick={() => { //the button to show/hide the channel list
            if (state.userInterface.channelListVisible) {
              state.dispatch(hideChannelList());
            } else {
              state.dispatch(showChannelList());
            }
        }}>
          <i className={'fa fa-caret-' + (state.userInterface.channelListVisible ? 'left' : 'right')}></i>
        </div>

        <div className="usersHideContainer" onClick={() => { //the button to show/hide the users list
          if (state.userInterface.userListVisible) {
            state.dispatch(hideUserList());
          } else {
            state.dispatch(showUserList());
          }
        }}>
          <i className={'fa fa-caret-' + (state.userInterface.userListVisible ? 'right' : 'left')}></i>
        </div>

        <div className="chatMessageContainer">
          <table className="chatMessageTable">
            {state.channels.length < 1 ?

              //display a message if there are no channels joined or listed
              <tbody>
                <tr className="chatMessageWrapper">
                  <td className="chatMessageTimestampContainer">
                    <p>[0000-00-00 00:00:00]</p>
                  </td>
        
                  <td className="chatMessageUsernameContainer chatMessageSystemUser">
                    <p className="pUserText">{systemNick}</p>
                  </td>
        
                  <td className="chatMessageTextContainer chatMessageSystemUser">
                    <p className="pMessageText">Please join a channel.</p>
                  </td>
                </tr>
              </tbody>
            :
            //filter the visible messages according to the current channel and user configuration                        
            getVisibleMessages(state).map((message) => {
              return <ChatMessage key={message.receivedTimestamp || message.sentTimestamp || 12345} message={message} loginState={state.loginState} />
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
