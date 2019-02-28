import React from 'react'
import { connect } from 'react-redux'
import { socket } from '../utils/handlers/client'
import log from '../utils/log'

class AdminModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      channelList: [],
      searchFilter: '',
      showDeactivateConfirmation: false,
      channelIdToDeactivate: 0,
      showTable: true
    }
  }
  handleConfirmedDeactivatedChannel = (response) => {
    console.log(response)
    this.setState({
      ...this.state,
      showDeactivateConfirmation: false,
      channelIdToDeactivate: 0,
      showTable: true
    });
  }
  handleReceiveAdminChannel = (response) => {
    //add the channels to the channel list as they're received
    this.setState({
      ...this.state,
      channelList: [
        ...this.state.channelList,
        response
      ]
    });
  }
  componentDidMount = () => {
    socket.on('admin channel', this.handleReceiveAdminChannel)
    socket.on('admin channel deactivate confirmation', this.handleConfirmedDeactivatedChannel)

    socket.emit('admin request channels')
  }
  componentWillUnmount = () => {
    socket.removeListener('admin channel', this.handleReceiveAdminChannel)
    socket.removeListener('admin channel deactivate confirmation', this.handleConfirmedDeactivatedChannel)
  }
  render() {
    return (
      <div className="admin-content-container">

        <p><button
          className="button-default"
          onClick={()=> {
            this.props.goToLocation('menu');
          }}
        >MainMenu
        </button></p>

        {this.state.showDeactivateConfirmation && 
          <div>
            <p className='admin-delete-confirmation'>Really set channel inactive? ID: {this.state.channelIdToDeactivate || ''}</p>
            <button onClick={(e)=>{
              e.preventDefault()
              console.log('sending deactivate request for ID: ' + this.state.channelIdToDeactivate)
              socket.emit('admin deactivate channel', this.state.channelIdToDeactivate);
            }}>Yes</button>
            <button onClick={(e)=>{
              e.preventDefault()
              this.setState({
                ...this.state,
                showDeactivateConfirmation: false,
                channelIdToDeactivate: 0,
                showTable: true
              })
            }}>No</button>
          </div>
        }

        {this.state.showTable &&
          <center>

            <p><label>Search: <input type="text" value={this.state.searchFilter || ''}
            onChange={(e) => {
              this.setState({
                ...this.state,
                searchFilter: e.target.value
              })
            }}
            /></label></p>

            <table className="adminChannelTable"><tbody>

              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Topic</th>
                <th>Visible?</th>
                <th>Default?</th>
                <th>Require Image?</th>
                <th>Requires Voice?</th>
                <th>Requires Login?</th>
                <th>Creator ID</th>
                <th>Creator Nick</th>
                <th>Is Active?</th>
                <th></th>
              </tr>

              {this.state.channelList.map((channel)=>{

                //get the value of the text search field
                const filter = this.state.searchFilter || '';

                //check for matches against the channel name and topic
                const nameMatch = channel.name.toLowerCase().includes(filter.toLowerCase());
                const topicMatch = channel.topic.toLowerCase().includes(filter.toLowerCase());
                if (!(nameMatch || topicMatch)) { return; }

                //map the output to table rows
                return (
                  <tr key={channel.channelId + "admin"}>
                    <td>{channel.channelId}</td>
                    <td>{channel.name}</td>
                    <td>{channel.topic}</td>
                    <td>{channel.isVisible ? 'Yes' : 'No'}</td>
                    <td>{channel.isDefault ? 'Yes' : 'No'}</td>
                    <td>{channel.requireImage ? 'Yes' : 'No'}</td>
                    <td>{channel.requireVoice ? 'Yes' : 'No'}</td>
                    <td>{channel.requireLogin ? 'Yes' : 'No'}</td>
                    <td>{channel.creatorId}</td>
                    <td>{channel.creatorNick}</td>
                    <td>{channel.isActive ? 'Yes' : 'No'}</td>
                    <td>
                      {channel.isActive &&
                        <a onClick={()=>{
                          this.props.setEditingChannel(channel)
                          setTimeout(()=>{this.props.goToLocation('createChannel')},1)
                      }}>Edit</a> }&nbsp; {channel.isActive &&
                        <a onClick={()=>{
                          this.setState({
                            ...this.state,
                            showTable: false,
                            channelIdToDeactivate: channel.channelId,
                            showDeactivateConfirmation: true
                          })
                        }}>Deactivate</a> }
                    </td>
                  </tr>
                );

              })}

            </tbody></table>
          </center>
        }
        
      </div>
    )
  }
}

export default connect((state) => { return state; })(AdminModal);