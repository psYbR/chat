import React from 'react';
import ChannelDescription from './ChannelDescription';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const ChatMainWindow = () => {
    return (
        <div className="chatWindowContainer">
            <ChannelDescription channelTopic={'Open and free discussion about RC multirotor (tri, quad, hex, octo)copter aircraft! From electronics to structural design, aerobatics to pilotage, and the embedded systems that piece it all together, all discussion is welcome so long as it is friendly and efficient'} />
            <div className="chatMessageContainer">
                <ChatMessage key="1" userName="tanglesBurger" messageText="A message from YOU about a bunch of stuff and a bunch of things!" isUser={true} />
                <ChatMessage key="2" userName="tangles" messageText="A message from a user about a bunch of stuff and a bunch of things!" />
                <ChatMessage key="3" userName="kitten-Meow" messageText="A message from a user about a bunch of stuff and a bunch of things!" />
                <ChatMessage key="4" userName="PantelicGR" messageText="A message from a user about a bunch of stuff and a bunch of things!" />
                <ChatMessage key="40" userName="*" messageText="A message from the system!!" isSystem={true}/>
                <ChatMessage key="5" userName="Pak" messageText="A message from a user about a bunch of stuff and a bunch of things!" />
                <ChatMessage key="6" userName="Pak_" messageText="A LONG message from a user about a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things!" />
                <ChatMessage key="7" userName="snafu" messageText="A message from a user about a bunch of stuff and a bunch of things!" />
                <ChatMessage key="8" userName="Guest63523" messageText="A message from a user about a bunch of stuff and a bunch of things!" />
                <ChatMessage key="9" userName="tanglesBurger" messageText="A message from YOU about a bunch of stuff and a bunch of things!" isUser={true}/>
                <ChatMessage key="10" userName="_abbenormal" messageText="A message from a user about a bunch of stuff and a bunch of things!" />
                <ChatMessage key="11" userName="ASTRA-" messageText="A message from a user about a bunch of stuff and a bunch of things!" />
                <ChatMessage key="12" userName="Brain" messageText="A message from a user about a bunch of stuff and a bunch of things!" />
                <ChatMessage key="13" userName="tanglesBurger" messageText="A message from YOU about a bunch of stuff and a bunch of things!" isUser={true}/>
                <ChatMessage key="14" userName="*" messageText="snafu (~snafu@60-241-147-232.tpgi.com.au) has joined" isSystem={true}/>
                <ChatMessage key="15" userName="*" messageText="sauvin has quit (Quit: Leaving)" isSystem={true}/>
                <ChatMessage key="16" userName="*" messageText="lufi has quit (Ping timeout: 256 seconds)" isSystem={true}/>
            </div>
            <ChatInput />
        </div>
    );
}

export default ChatMainWindow;