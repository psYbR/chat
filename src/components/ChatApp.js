import React from 'react';
import ChannelList from './ChannelList';
import ChatMainWindow from './ChatMainWindow';
import UserList from './UserList';
import DOMHandler from './DOMHandler';
import LoginModal from './LoginModal';
import ConnectingModal from './ConnectingModal';
import ChannelPicker from './ChannelPicker';
import LeaveChannelModal from './LeaveChannelModal';
import AdminModal from './AdminModal';
import { connect } from 'react-redux';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={this.props.configuration.lightTheme ? "chatAppContainer-light" : "chatAppContainer"}>
        <DOMHandler />

        {(!this.props.userInterface.appIsConnected
        || !this.props.userInterface.defaultChannelsReceived)
          && <ConnectingModal />}

        {(this.props.userInterface.loginModalVisible
        && this.props.userInterface.appIsConnected
        && this.props.userInterface.defaultChannelsReceived)
          && <LoginModal />}

        {this.props.adminInterface.adminModalVisible
          && <AdminModal />}

        {(this.props.userInterface.channelPickerVisible
        && this.props.userInterface.appIsConnected && this.props.loginState.loggedIn)
          && <ChannelPicker />}

        {(this.props.userInterface.leaveChannelModalVisible
        && this.props.userInterface.appIsConnected && this.props.loginState.loggedIn)
          && <LeaveChannelModal />}

        {this.props.userInterface.channelListVisible
          && <ChannelList />}

        <ChatMainWindow />

        {this.props.userInterface.userListVisible
          && <UserList />}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ChatApp);