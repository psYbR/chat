import React from 'react';
import { connect } from 'react-redux';

class AdminModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editingChannel: {
        id: '',
        name: '',
        topic: '',
        isVisible: true,
        isDefault: true,
        requiresVoice: false,
        requiresRegistration: false,
        requiresImage: true,
        creator: ''
      }
    }
  }
  componentWillMount() {
    if (this.props.editingChannel) {
      this.setState({
        editingChannel: this.props.editingChannel
      })
    }
  }
  render() {
    return (
      <div className="adminContentContainer">

        <button
            className="buttonDefault"
            onClick={()=> {
              this.props.goToLocation('menu');
            }}
          >MainMenu
        </button>

        <h3>Edit/Create Channel</h3>

        <form className="adminChannelForm"
          onSubmit={(e)=> {
            e.preventDefault();
            //do stuff here
          }} >
          <label>ID: {this.state.editingChannel.id}</label>
          <label><input type="text" placeholder="Channel Name" defaultValue={this.state.editingChannel.name} />Channel name</label>
          <label><input type="text" placeholder="Channel Topic" defaultValue={this.state.editingChannel.topic} />Topic</label>
          <label><input type="checkbox" defaultChecked={this.state.editingChannel.isVisible} />IsVisible</label>
          <label><input type="checkbox" defaultChecked={this.state.editingChannel.isDefault} />isDefault</label>
          <label><input type="checkbox" defaultChecked={this.state.editingChannel.requiresVoice} />RequiresVoice</label>
          <label><input type="checkbox" defaultChecked={this.state.editingChannel.requiresRegistration} />RequiresRegistration</label>
          <label><input type="checkbox" defaultChecked={this.state.editingChannel.requiresImage} />RequiresImage</label>
          <label>CreatedBy: {this.state.editingChannel.creator}</label>
          <label><input type="submit" value="Save" /></label>
        </form>
        
      </div>
    )
  }
}

export default connect((state) => { return state; })(AdminModal);