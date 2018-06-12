import React from 'react';
import ChannelList from './ChannelList';
import ChatMainWindow from './ChatMainWindow';
import UserList from './UserList';
import Window from './WindowResize';
import WelcomeModal from './WelcomeModal';
import ConnectingModal from './ConnectingModal';
import ChannelPicker from './ChannelPicker';
import { connect } from 'react-redux';

class ChatApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="chatAppContainer">
                <Window />
                {(!this.props.loginState.loggedIn
                && this.props.userInterface.appIsConnected
                && this.props.userInterface.defaultChannelsReceived)
                    && <WelcomeModal />}
                {(!this.props.userInterface.appIsConnected
                || !this.props.userInterface.defaultChannelsReceived)
                    && <ConnectingModal />}
                {this.props.userInterface.channelPickerIsVisible
                    && <ChannelPicker />}
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