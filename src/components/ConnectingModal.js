import React from 'react';
import { connect } from 'react-redux';

class ConnectingModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-outer-container">
          <div className="modal-inner-container connectingModalContainer">
            <h1 className="connectingTitle">{this.props.userInterface.reconnectionMessage}...</h1>
            <h1 style={{textAlign: 'center'}}><div className="fa fa-spinner fa-spin"></div></h1>
            {this.props.userInterface.appIsConnected ? 
              <p>Connected to server.</p>
              : <p>Establishing connection...</p>}
            {(!this.props.userInterface.appIsConnected
              && this.props.userInterface.disconnectionReason != "")
              && <p>{this.props.userInterface.disconnectionReason}</p>}
            {(this.props.userInterface.appIsConnected
            && !this.props.userInterface.defaultChannelsReceived)
              && <p>Downloading channel info - {this.props.channels.filter(channel=>channel.isDefault == true).length} channels received...</p>}
          </div>
        </div>
      </div>
    );
  };
}

export default connect(state=>state)(ConnectingModal);