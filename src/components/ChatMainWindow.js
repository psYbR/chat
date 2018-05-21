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
                <ChatMessage key="5" userName="Pak" messageText="((̲̅ ̲̅(̲̅C̲̅r̲̅a̲̅y̲̅o̲̅l̲̲̅̅a̲̅( ̲̅((>     ☁ ▅▒░☼‿☼░▒▅ ☁" />
                <ChatMessage key="6" userName="Pak_" messageText="A LONG message from a user about a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things and a bunch of stuff and a bunch of things!" />
                <ChatMessage key="9" userName="tanglesBurger" messageText="A message from YOU about a bunch of stuff and a bunch of things!" isUser={true}/>
                <ChatMessage key="10" userName="_abbenormal" messageText="__̴ı̴̴̡̡̡ ̡͌l̡̡̡ ̡͌l̡*̡̡ ̴̡ı̴̴̡ ̡̡͡|̲̲̲͡͡͡ ̲▫̲͡ ̲̲̲͡͡π̲̲͡͡ ̲̲͡▫̲̲͡͡ ̲|̡̡̡ ̡ ̴̡ı̴̡̡ ̡͌l̡̡̡̡.___" />
                <ChatMessage key="13" userName="tanglesBurger" messageText="A message from YOU about a bunch of stuff and a bunch of things!" isUser={true}/>
                <ChatMessage key="14" userName="*" messageText="snafu (~snafu@60-241-147-232.tpgi.com.au) has joined" isSystem={true}/>
                <ChatMessage key="15" userName="*" messageText="sauvin has quit (Quit: Leaving)" isSystem={true}/>
                <ChatMessage key="16" userName="*" messageText="lufi has quit (Ping timeout: 256 seconds)" isSystem={true}/>
                <ChatMessage key="17" userName="*" messageText="Colours: ^0A^1A^2A^3A^4A^5A^6A^7A^8A^9A^10A^11A^12A^13A^14A^15A" isSystem={true}/>
                <ChatMessage key="18" userName="*" messageText="Colours and backgrounds: ^1,0A^0,1A^1,2A^2,3A^3,4A^4,5A^5,6A^6,7A^7,8A^8,9A^9,10A^10,11A^11,12A^12,13A^13,14A^15,1A" isSystem={true}/>
                <ChatMessage key="19" userName="*" messageText="Test: ^0,1TEXT" isSystem={true}/>
                <ChatMessage key="20" userName="*" messageText="This text uses invalid color and invalid background color codes (20,20): ^20,20TEXT" isSystem={true}/>
                <ChatMessage key="21" userName="*" messageText="Invalid color (20): ^20TEXT Valid color, invalid background: (1,20) ^1,20TEXT" isSystem={true}/>
                <ChatMessage key="22" userName="*" messageText="Invalid color valid background: (20,1) ^20,1TEXT" isSystem={true}/>
            </div>
            <ChatInput />
        </div>
    );
}

export default ChatMainWindow;