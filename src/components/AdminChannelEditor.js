import React from 'react';
import { socket } from '../utils/handlers/client';
import { connect } from 'react-redux';

class AdminModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelId: this.props.editingChannel.channelId,
      name: this.props.editingChannel.name,
      topic: this.props.editingChannel.topic,
      isVisible: this.props.editingChannel.isVisible,
      isDefault: this.props.editingChannel.isDefault,
      requireImage: this.props.editingChannel.requireImage,
      requireVoice: this.props.editingChannel.requireVoice,
      requireLogin: this.props.editingChannel.requireLogin,
      creatorId: this.props.editingChannel.creatorId,
      creatorNick: this.props.editingChannel.creatorNick,

      waitingForConfirmation: false
    }
  }
  handleConfirmedChannel = (response) => {
    console.log(response)
    this.setState({
      ...this.state,
      waitingForConfirmation: false
    });
  }
  componentDidMount(){
    socket.on('admin channel create or edit confirmation', this.handleConfirmedChannel)
  }
  componentWillUnmount(){
    socket.removeListener('admin channel create or edit confirmation', this.handleConfirmedChannel)
  }
  render() {
    return (
      <div className="admin-content-container">

        <button
          className="button-default"
          onClick={()=> {
            this.props.goToLocation('menu');
          }}
        >MainMenu</button>

        <h3>Edit/Create Channel</h3>

        <center>
        <form onSubmit={(e)=> {
            const channel = {
              channelId: this.state.channelId,
              name: this.state.name,
              topic: this.state.topic,
              isVisible: this.state.isVisible,
              isDefault: this.state.isDefault,
              requireImage: this.state.requireImage,
              requireVoice: this.state.requireVoice,
              requireLogin: this.state.requireLogin,
              creatorId: this.state.creatorId,
              creatorNick: this.state.creatorNick
            }
            e.preventDefault();
            if (this.state.channelId != '') { //if editing instead of new
              socket.emit('admin edit channel', channel)
            } else {
              socket.emit('admin create channel', channel)
            }
          }} >

          <table className='admin-channel-editor-table'>
            <tbody>
              <tr><td>ID:</td><td>{this.state.channelId}</td>
                <td>Is Visible?</td><td><input type="checkbox" checked={this.state.isVisible} onChange={()=>{this.setState({ ...this.state, isVisible: !this.state.isVisible})}} /></td></tr>
              <tr><td>Channel Name:</td><td><input type="text" placeholder="Channel Name" value={this.state.name} onChange={(e)=>{this.setState({ ...this.state, name: e.target.value})}} /></td>
                <td>Is Default?</td><td><input type="checkbox" checked={this.state.isDefault} onChange={()=>{this.setState({ ...this.state, isDefault: !this.state.isDefault})}}/></td></tr>
              <tr><td>Topic:</td><td><input type="text" placeholder="Channel Topic" value={this.state.topic} onChange={(e)=>{this.setState({ ...this.state, topic: e.target.value})}} /></td>
                <td>Require Image?</td><td><input type="checkbox" checked={this.state.requireImage} onChange={()=>{this.setState({ ...this.state, requireImage: !this.state.requireImage})}}/></td></tr>
              <tr><td>Creator ID:</td><td>{this.state.creatorId}</td>
                <td>Require Voice?</td><td><input type="checkbox" checked={this.state.requireVoice} onChange={()=>{this.setState({ ...this.state, requireVoice: !this.state.requireVoice})}} /></td></tr>
              <tr><td>Creator Nick:</td><td>{this.state.creatorNick}</td>
                <td>Require Login?</td><td><input type="checkbox" checked={this.state.requireLogin} onChange={()=>{this.setState({ ...this.state, requireLogin: !this.state.requireLogin})}} /></td></tr>
              <tr><td colSpan='4'><input className='button-default' type="submit" value="Save" /></td></tr>
            </tbody>
          </table>
        </form>
        </center>
        
      </div>
    )
  }
}

export default connect((state) => { return state; })(AdminModal);