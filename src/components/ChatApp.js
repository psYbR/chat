import React from 'react';
import ChannelList from './ChannelList';
import ChatMainWindow from './ChatMainWindow';
import UserWindow from './UserWindow';
import Window from './WindowResize.js';

const ChatApp = () => {
    return (
        <div className="chatAppContainer">
            <Window />
            <ChannelList />
            <ChatMainWindow />
            <UserWindow />
        </div>
    );
}

export default ChatApp;