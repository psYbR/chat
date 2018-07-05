import React from 'react';
import { connect } from 'react-redux';
import ChannelTopic from './ChannelTopic';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';
import getVisibleMessages from '../selectors/getVisibleMessages';
import StyleModal from './StyleModal';
import { hideChannelList, showChannelList, hideUserList, showUserList } from '../actions/userInterfaceActions';
import { systemNick, maxPastedImageSize } from '../config';

class ChatMainWindow extends React.Component {
  constructor(props) {
    super(props)
  }
  //this function is called when the component has (supposedly) finished rendering any changes to its state
  componentDidUpdate() {
    //scroll the window to the bottom if the user hasn't scrolled up
    const elem = $('.chatMessageContainer') //get the element which we will scroll
    const parentElem = $('.chatWindowContainer') //get the parent element (we need to know the height)
    const height = elem[0].scrollHeight;
    const curScroll = elem[0].scrollTop; //get the scroll position (this is the actual height of the element - the visible height)
    const scrollDiff = (height - curScroll) - parentElem[0].scrollHeight; //calculate how far from the bottom the user has scrolled up. this value is actually about -80 when fully at the bottom and is about 20 when scrolled up a few lines
    //console.log("scroll diff: " + scrollDiff + ". height - cur pos = " + height + " - " + curScroll + " = " + (height - curScroll));
    if ( scrollDiff < 20) {
      setTimeout(() => {
        // scroll the element to the bottom whenever its contents change. the timeout is yucky but even though this function sits on componentDidUpdate(), React hasn't finished rendering the window so setting the scroll position immediately results in setting it to wherever the render is up to
        elem.stop().animate({
          scrollTop: elem[0].scrollHeight
        }, 800);
      }, 1);
    }
  }
  render() {
    return (
      <div className={"chatWindowContainer" + (this.props.userInterface.appIsBlurred ? " chatAppBlur" : '') /*Blur the app if the user isn't logged in*/}>
  
        <ChannelTopic
          channelTopic={
              this.props.channels.filter(channel => channel.isCurrent)[0] //if the current channel is found
            ?
              this.props.channels.filter(channel => channel.isCurrent)[0].topic //use the topic
            : '' //otherwise leave it blank
          }
        />
  
        <div className="chatMessageOuterContainer emphasised-container">
  
          {this.props.userInterface.styleSelectionIsVisible && <StyleModal /> /* show the style modal if the button has been clicked */}
  
          <div className="channelsHideContainer"
            onClick={() => { //the button to show/hide the channel list
              if (this.props.userInterface.channelListIsVisible) {
                this.props.dispatch(hideChannelList());
              } else {
                this.props.dispatch(showChannelList());
              }
          }}>
            <i className={'fa fa-caret-' + (this.props.userInterface.channelListIsVisible ? 'left' : 'right')}></i>
          </div>
  
          <div className="usersHideContainer" onClick={() => { //the button to show/hide the users list
            if (this.props.userInterface.userListIsVisible) {
              this.props.dispatch(hideUserList());
            } else {
              this.props.dispatch(showUserList());
            }
          }}>
            <i className={'fa fa-caret-' + (this.props.userInterface.userListIsVisible ? 'right' : 'left')}></i>
          </div>
  
          <div className="chatMessageContainer">
            <table className="chatMessageTable">
              <tbody>
                {this.props.channels.length < 1 ?
    
                  //display a message if there are no channels joined or listed
                  
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
                  
                :
                //filter the visible messages according to the current channel and user configuration                        
                getVisibleMessages(this.props).map((message) => {
                  return <ChatMessage key={message.receivedTimestamp || message.sentTimestamp || 12345} message={message} loginState={this.props.loginState} />
                })}

                {this.props.userInterface.pastedImageSize > maxPastedImageSize &&
                  <tr className="chatMessageWrapper">
                    <td className="chatMessageTimestampContainer">
                    </td>
            
                    <td className="chatMessageUsernameContainer chatMessageSystemUser">
                    </td>
            
                    <td className="chatMessageTextContainer chatMessageSystemUser">
                    <p><font style={{color: 'red'}}>Image size too large! Please remove and paste a smaller image.</font></p>
                    </td>
                  </tr>}
              </tbody>
            </table>
          </div>
  
        </div>
  
        <ChatInput />
  
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(ChatMainWindow);
