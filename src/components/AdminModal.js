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
      //tablesCreated: false,
      visibleContent: 'menu',
      adminResponse: '',
      editingChannel: {
        channelId: '',
        name: '',
        topic: '',
        isVisible: true,
        isDefault: true,
        requireImage: true,
        requireVoice: false,
        requireLogin: false,
        creatorId: 0,
        creatorNick: ''
      }
    }
  }
  goToLocation = (location) => {
    this.setState({
      ...this.state,
      visibleContent: location
    });
  }
  setEditingChannel = (channel) => {
    this.setState({
      ...this.state,
      editingChannel: channel
    });
  }
  render() {
    return (
      <div className="modal-wrapper">
        <div className="modal-outer-container admin-modal-outer-container">
          <div className="modal-inner-container connecting-modal-container admin-modal-inner-container">

            <h1>Admin Menu <a onClick={() => {
              this.props.dispatch(unsetAdminModalVisible());
            }}><i className="fas fa-times"></i></a></h1>

            {this.state.visibleContent == 'menu' &&
              <div>
              <p>{this.state.adminResponse}</p>

              <button
                className="button-default"
                onClick={() => {
                  this.setState({
                    ...this.state,
                    editingChannel: {
                      channelId: '',
                      name: '',
                      topic: '',
                      isVisible: true,
                      isDefault: true,
                      requireImage: true,
                      requireVoice: false,
                      requireLogin: false,
                      creatorId: 0,
                      creatorNick: ''
                    },
                    visibleContent: 'createChannel'
                  })
                  setTimeout(()=>{
                    this.setState({
                      ...this.state,
                      visibleContent: 'createChannel'
                    })
                  },1)
                }}
              >Create New Channel
              </button>

              <button
                className="button-default"
                onClick={()=> {
                  this.setState({
                    ...this.state,
                    visibleContent: 'channelList'
                  })
                }}
              >View / Edit Channels
              </button></div>
            }

            {this.state.visibleContent == 'createChannel' && <AdminChannelEditor goToLocation={this.goToLocation} editingChannel={this.state.editingChannel} />}
            {this.state.visibleContent == 'channelList' && <AdminChannelList goToLocation={this.goToLocation} setEditingChannel={this.setEditingChannel} />}

          </div>
        </div>
      </div>
    )
  }
}

export default connect(state=>state)(AdminModal);