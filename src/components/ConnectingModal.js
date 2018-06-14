import React from 'react';
import { connect } from 'react-redux';
import { setUserNick, setLoggedIn } from '../actions/loginActions';
import { unblurApp } from '../actions/userInterfaceActions';

class ConnectingModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="ModalWrapper">
        <div className="ModalBlurContainer">
        </div>
        <div className="ModalOuterContainer">
            <div className="ModalInnerContainer ConnectingModalContainer">
                <h1 className="connectingTitle">{this.props.userInterface.reconnectionMessage}...</h1>
                <h1 style={
                    {
                        textAlign: 'center'
                    }
                }><div className="fa fa-spinner fa-spin"></div></h1>
                {!this.props.userInterface.appIsConnected
                  && <p>establishing connection...</p>}
                {(this.props.userInterface.appIsConnected
                && !this.props.userInterface.defaultChannelsReceived)
                  && <p>downloading channel info - {this.props.defaultChannels.length} channels received...</p>}
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