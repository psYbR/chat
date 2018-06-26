import React from 'react';
import ChannelList from './ChannelList';
import ChatMainWindow from './ChatMainWindow';
import UserList from './UserList';
import DOMHandler from './DOMHandler';
import WelcomeModal from './WelcomeModal';
import ConnectingModal from './ConnectingModal';
import ChannelPicker from './ChannelPicker';
import LeaveChannelModal from './LeaveChannelModal';
import { connect } from 'react-redux';

class ChatApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="chatAppContainer">
                <DOMHandler />
                {(!this.props.userInterface.appIsConnected
                || !this.props.userInterface.defaultChannelsReceived)
                    && <ConnectingModal />}
                {(!this.props.loginState.loggedIn
                && this.props.userInterface.appIsConnected
                && this.props.userInterface.defaultChannelsReceived)
                    && <WelcomeModal />}
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