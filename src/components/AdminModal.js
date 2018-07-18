import React from 'react';
import { connect } from 'react-redux';
import {
  adminRequestChannels
} from '../utils/handlers/handleAdmin';
import  {
  setAdminVisibleContent,
  setAdminChannelSearchFilter,
  setAdminEditingChannel
} from '../actions/actions';

let channelListObtained = false;

class EditChannel1 extends React.Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <div className="adminContentContainer">
        {this.props.adminChannels.map((channel)=> {
          if (channel.channelId != this.props.adminInterface.editingChannelId) { 
            return;
          }
          return (
            <form
              key={channel.channelId}
              onSubmit={()=> {
                console.log("submitted");
              }} >
              <input type="text" placeholder="Channel Name" defaultValue={channel.channelName}/>
              <input type="submit" value="Save" />
            </form>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps1 = (state) => { return state };
const EditChannel = connect(mapStateToProps1)(EditChannel1);

class AdminModal extends React.Component {
  constructor(props) {
    super(props);
  }
  render = () => {
    return (
      <div className="modalWrapper">
        <div className="modalBlurContainer">
        </div>
        <div className="modalOuterContainer">
          <div className="modalInnerContainer connectingModalContainer">

            <h1>Admin Tools</h1>

            <button
              className="buttonDefault"
              onClick={() => {
                console.log('create default')
              }}
            >Create Channel
            </button>

            <button
              className="buttonDefault"
              onClick={()=> {
                if (!channelListObtained) {
                  adminRequestChannels();
                  channelListObtained = true;
                }
                this.props.dispatch(setAdminVisibleContent("editChannelList"));
              }}
            >Edit Channels
            </button>

            {/* Begin content section*/
              this.props.adminInterface.visibleContent == "editChannel" &&
              <EditChannel />
              /* End content section*/
            }

            {/* Begin content section*/
            this.props.adminInterface.visibleContent == "editChannelList" &&
              <div className="adminContentContainer">

                <input
                  type="text"
                  value={this.props.adminInterface.searchFilter || ''}
                  onChange={(e) => {
                    this.props.dispatch(setAdminChannelSearchFilter(e.target.value));
                  }}
                />

                <table className="adminChannelTable">
                  <tbody>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Topic</th>
                      <th>Default?</th>
                      <th></th>
                    </tr>

                    {this.props.adminChannels.map((channel)=>{

                      //get the value of the text search field
                      const filter = this.props.adminInterface.searchFilter || '';
                      //check for matches against the channel name and topic
                      const nameMatch = channel.channelName.toLowerCase().includes(filter.toLowerCase());
                      const topicMatch = channel.topic.toLowerCase().includes(filter.toLowerCase());
                      if (!(nameMatch || topicMatch)) { return; }
                      //map the output to table rows
                      return (
                        <tr key={channel.channelId}>
                          <td>{channel.channelId}</td>
                          <td>{channel.channelName}</td>
                          <td>{channel.topic}</td>
                          <td>{channel.isDefault ? 'Yes' : 'No'}</td>
                          <td><button key={channel.channelId} onClick={()=>{
                            this.props.dispatch(setAdminVisibleContent("editChannel"));
                            this.props.dispatch(setAdminEditingChannel(channel.channelId));
                          }}>Edit</button></td>
                        </tr>
                      );

                    })}
                  </tbody>
                </table>
              </div>
            /* End content section*/}

          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return state;
};
export default connect(mapStateToProps)(AdminModal);