import React from 'react';
import ChannelList from './ChannelList';
import ChatMainWindow from './ChatMainWindow';
import UserWindow from './UserWindow';
import Window from './WindowResize';
import WelcomeModal from './WelcomeModal';
import { connect } from 'react-redux';

const ChatApp = ({ configuration }) => {
    return (
        <div className="chatAppContainer">
            <Window />
            {!configuration.loggedIn && <WelcomeModal />}
            <ChannelList />
            <ChatMainWindow />
            <UserWindow />
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ChatApp);