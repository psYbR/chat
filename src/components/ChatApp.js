import React from 'react';
import ChannelList from './ChannelList';
import ChatMainWindow from './ChatMainWindow';
import UserWindow from './UserWindow';
import Window from './WindowResize';
import WelcomeModal from './WelcomeModal';
import { connect } from 'react-redux';

class ChatApp extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="chatAppContainer">
                <Window />                
                    {!this.props.configuration.loggedIn && <WelcomeModal />}
                <ChannelList />
                <ChatMainWindow />
                <UserWindow />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return state;
}

export default connect(mapStateToProps)(ChatApp);