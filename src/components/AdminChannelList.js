import React from 'react';
import { connect } from 'react-redux';
import socket from '../utils/handlers/client';

class AdminModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelList: [],
      searchFilter: ''
    }
  }
  componentDidMount() {
    socket.emit('admin request channels', (response)=>{
      this.setState({
        ...this.state,
        channelList: response
       });
    });
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

        <label>Search: <input type="text" value={this.state.searchFilter || ''}
          onChange={(e) => {
            this.setState({
              ...this.state,
              searchFilter: e.target.value
            })
          }}
        /></label>

        <table className="adminChannelTable"><tbody>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Topic</th>
            <th>Default?</th>
            <th></th>
          </tr>

          {this.props.adminChannels.map((channel)=>{

            //get the value of the text search field
            const filter = this.state.searchFilter || '';
            //check for matches against the channel name and topic
            const nameMatch = channel.channelName.toLowerCase().includes(filter.toLowerCase());
            const topicMatch = channel.topic.toLowerCase().includes(filter.toLowerCase());
            if (!(nameMatch || topicMatch)) { return; }
            //map the output to table rows
            return (
              <tr key={channel.channelId + "Y"}>
                <td>{channel.channelId}</td>
                <td>{channel.channelName}</td>
                <td>{channel.topic}</td>
                <td>{channel.isDefault ? 'Yes' : 'No'}</td>
                <td><button key={channel.channelId} onClick={()=>{
                  this.props.dispatch(setAdminVisibleContent("editChannel"));
                  this.props.dispatch(setAdminEditingChannel(channel.channelId));
                }}>Edit</button>
                <button key={channel.channelId + "X"} onClick={()=>{
                  console.log("delete channel " + channel.channelId)
                }}>Delete</button></td>
              </tr>
            );

          })}

        </tbody></table>
      </div>
    )
  }
}

export default connect((state) => { return state; })(AdminModal);