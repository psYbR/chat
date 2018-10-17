import React from 'react';
import ChannelList from './ChannelList';
import ChatMainWindow from './ChatMainWindow';
import UserList from './UserList';
import DOMHandler from './DOMHandler';
import LoginModal from './LoginModal';
import ConnectingModal from './ConnectingModal';
import ChannelPickerModal from './ChannelPickerModal';
import LeaveChannelModal from './LeaveChannelModal';
import AdminModal from './AdminModal';
import { connect } from 'react-redux';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    //&& this.props.loginState.loggedIn
    return (
      <div className={"blazechat-root-container" + (this.props.configuration.lightTheme ? " blazechat-root-container-light" : "")}>

        <DOMHandler />
        {(!this.props.userInterface.appIsConnected || !this.props.userInterface.defaultChannelsReceived) && <ConnectingModal />}
        {(this.props.userInterface.loginModalVisible && this.props.userInterface.appIsConnected && this.props.userInterface.defaultChannelsReceived) && <LoginModal />}
        {(this.props.userInterface.adminModalVisible && this.props.userInterface.appIsConnected) && <AdminModal />}
        {(this.props.userInterface.channelPickerVisible && this.props.userInterface.appIsConnected) && <ChannelPickerModal />}
        {(this.props.userInterface.leaveChannelModalVisible && this.props.userInterface.appIsConnected) && <LeaveChannelModal />}

        <div className={"blazechat-overlay-container" + (this.props.userInterface.appIsBlurred ? " blur-container" : "")}>
          {this.props.userInterface.channelListVisible && <ChannelList />}
          <ChatMainWindow />
          {this.props.userInterface.userListVisible && <UserList />}
          <div className={'blazechat-color-overlay' + (this.props.userInterface.appIsBlurred ? ' blazechat-color-overlay-visible' : ' blazechat-color-overlay-invisible') + (this.props.configuration.lightTheme ? " blazechat-color-overlay-light" : "")}></div>
        </div>

      </div>
    );
  }
}

export default connect(state=>state)(ChatApp);