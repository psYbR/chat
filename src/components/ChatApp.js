import React from 'react';
import ChannelList from './ChannelList';
import ChatMainWindow from './ChatMainWindow';
import UserList from './UserList';
import DOMHandler from './DOMHandler';
import WelcomeModal from './WelcomeModal';
import ConnectingModal from './ConnectingModal';
import ChannelPicker from './ChannelPicker';
import LeaveChannelModal from './LeaveChannelModal';
import AdminModal from './AdminModal';
import { connect } from 'react-redux';

class ChatApp extends React.Component {
  constructor(props) {
    super(props);
  } // {this.props.configuration.lightTheme ? "-light" : ""}
  render() {
    return (
      <div className={this.props.configuration.lightTheme ? "chatAppContainer-light" : "chatAppContainer"}>
        <DOMHandler />
        {(!this.props.userInterface.appIsConnected
        || !this.props.userInterface.defaultChannelsReceived)
          && <ConnectingModal />}
        {(!this.props.loginState.loggedIn
        && this.props.userInterface.appIsConnected
        && this.props.userInterface.defaultChannelsReceived)
          && <WelcomeModal />}
        {this.props.adminInterface.adminModalIsVisible
          && <AdminModal />}
        {(this.props.userInterface.channelPickerIsVisible
        && this.props.userInterface.appIsConnected && this.props.loginState.loggedIn)
          && <ChannelPicker />}
        {(this.props.userInterface.leaveChannelModalIsVisible
        && this.props.userInterface.appIsConnected && this.props.loginState.loggedIn)
          && <LeaveChannelModal />}
        {this.props.userInterface.channelListIsVisible
          && <ChannelList />}
        <ChatMainWindow />
        {this.props.userInterface.userListIsVisible
          && <UserList />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ChatApp);