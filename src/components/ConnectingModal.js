import React from 'react';
import { connect } from 'react-redux';
import { setUserNick, setLoggedIn } from '../actions/loginActions';
import { unblurApp } from '../actions/userInterfaceActions';
import ChannelPicker from './ChannelPicker';

class ConnectingModal extends React.Component {
  constructor(props) {
      super(props);
  }
  render() {
    return (
      <div className="ModalWrapper">
        <div className="WelcomeBlurContainer">
        </div>
        <div className="WelcomeModalOuterContainer">
            <div className="WelcomeModalInnerContainer ConnectingModalContainer">
                <h1 className="connectingTitle">Connecting...</h1>
                <h1 style={
                    {
                        textAlign: 'center'
                    }
                }><div className="fa fa-spinner fa-spin"></div></h1>
                {!this.props.userInterface.appIsConnected && <p>establishing connection...</p>}
                {!this.props.userInterface.defaultChannelsReceived && <p>downloading list of channels...</p>}
            </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(ConnectingModal);