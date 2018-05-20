import React from 'react';
import ChannelList from './ChannelList';
import ChatMainWindow from './ChatMainWindow';
import UserWindow from './UserWindow';

const ChatApp = () => {
    return (
        <div className="chatAppContainer">
            <ChannelList />
            <ChatMainWindow />
            <UserWindow />
        </div>
    );
}

export default ChatApp;