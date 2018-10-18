import React from 'react';
import { connect } from 'react-redux';
import { socket } from '../utils/handlers/client';
import  {
  //resetAdminChannelList
  unsetAdminModalVisible
} from '../actions/actions';
import AdminChannelList from './AdminChannelList';
import AdminChannelEditor from './AdminChannelEditor';

class AdminModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tablesCreated: false,
      visibleContent: 'menu',
      adminResponse: '',
      editingChannel: {}
    }
    this.goToLocation = this.goToLocation.bind(this);
    this.setEditingChannel = this.setEditingChannel.bind(this);
  }
  goToLocation(location) {
    this.setState({
      ...this.state,
      visibleContent: location
    });
  }
  setEditingChannel(channel) {
    this.setState({
      ...this.state,
      editingChannel: channel
    });
  }
  render() {
    return (
      <div className="modal-wrapper">
        {/* <div className="modal-blur-container">
        </div> */}
        <div className="modal-outer-container">
          <div className="modal-inner-container connectingModalContainer">

            <h1>Admin Menu <a onClick={() => {
              this.props.dispatch(unsetAdminModalVisible());
            }}><i className="fas fa-times"></i></a></h1>

            {this.state.visibleContent == 'menu' &&
              <div>
              <p>{this.state.adminResponse}</p>

              <button
                className="buttonDefault"
                onClick={() => {
                  socket.emit('admin create database tables', (response) => {
                    this.setState({
                      ...this.state,
                      adminResponse: response
                    });
                  });
                }}
              >Create Database Tables
              </button>

              <button
                className="buttonDefault"
                onClick={() => {
                  socket.emit('admin create default admin user', (response) => {
                    this.setState({
                      ...this.state,
                      adminResponse: response
                    });
                  });
                }}
              >Create Default Admin
              </button>

              <button
                className="buttonDefault"
                onClick={() => {
                  this.setState({
                    ...this.state,
                    visibleContent: 'createChannel'
                  })
                }}
              >Create Channel
              </button>

              <button
                className="buttonDefault"
                onClick={()=> {
                  this.setState({
                    ...this.state,
                    visibleContent: 'channelList'
                  })
                }}
              >Edit Channels
              </button></div>
            }

            {this.state.visibleContent == 'createChannel' && <AdminChannelEditor goToLocation={this.goToLocation} editingChannel={this.editingChannel} />}
            {this.state.visibleContent == 'channelList' && <AdminChannelList goToLocation={this.goToLocation} />}

          </div>
        </div>
      </div>
    )
  }
}

export default connect(state=>state)(AdminModal);