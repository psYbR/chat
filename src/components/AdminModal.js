//this script is lazy as FUCK.
//layout is shit
//it's absolute bare minimum to administer channels

import React from 'react';
import { connect } from 'react-redux';
import {
  adminRequestChannels,
  adminCreateChannel,
  adminDbCreateTables,
  adminDbCreateDefaultAdminUser
} from '../utils/handlers/handleAdmin';
import  {
  setAdminVisibleContent,
  setAdminChannelSearchFilter,
  setAdminEditingChannel,
  removeAdminChannels,
  setAdminState
} from '../actions/actions';

let channelListObtained = false;

class AdminModal extends React.Component {
  constructor(props) {
    super(props);
    this.tablesCreated = false;
  }
  render() {
    return (
      <div className="modalWrapper">
        <div className="modalBlurContainer">
        </div>
        <div className="modalOuterContainer">
          <div className="modalInnerContainer connectingModalContainer">

            <h1>Admin Tools <a onClick={() => {
              this.props.dispatch(setAdminState());
              this.props.dispatch(removeAdminChannels());
              channelListObtained = false;
            }}><i className="fas fa-times"></i></a></h1>

            <p>{this.props.adminInterface.adminResponse}</p>

            <button
              className="buttonDefault"
              onClick={() => {
                adminDbCreateTables();
              }}
            >Create Database Tables
            </button>

            <button
              className="buttonDefault"
              onClick={() => {
                adminDbCreateDefaultAdminUser();
              }}
            >Create Default Admin
            </button>

            <button
              className="buttonDefault"
              onClick={() => {
                this.props.dispatch(setAdminVisibleContent("createChannel"));
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

            {/* Begin content section CREATE CHANNEL*/
              this.props.adminInterface.visibleContent == "createChannel" &&
              <div className="adminContentContainer">

                <form
                  className="adminChannelForm"
                  onSubmit={(e)=> {
                    e.preventDefault();
                    console.log(e.target);
                    const newChannel = {};
                    adminCreateChannel(newChannel);
                    this.props.dispatch(removeAdminChannels());
                    this.props.dispatch(setAdminVisibleContent());
                    setTimeout(adminRequestChannels(), 1000);
                  }} >
                  <label><input type="text" placeholder="Channel Name" /></label>
                  <label><input type="text" placeholder="Channel Topic" /></label>
                  <label><input type="checkbox" defaultChecked={true} />IsVisible</label>
                  <label><input type="checkbox" />isDefault</label>
                  <label><input type="checkbox" />RequiresVoice</label>
                  <label><input type="checkbox" />RequiresRegistration</label>
                  <label>CreatedBy: system (*)</label>
                  <label><input type="submit" value="Save" /></label>
                </form>
              </div>
              /* End content section*/
            }

            {/* Begin content section EDIT CHANNEL*/
              this.props.adminInterface.visibleContent == "editChannel" &&
              <div className="adminContentContainer">
                {this.props.adminChannels.map((channel)=> {
                  if (channel.channelId != this.props.adminInterface.editingChannelId) { 
                    return;
                  }
                  return (
                    <form
                      className="adminChannelForm"
                      key={channel.channelId}
                      onSubmit={(e)=> {
                        e.preventDefault();
                        this.props.dispatch(removeAdminChannels());
                        this.props.dispatch(setAdminVisibleContent());
                        setTimeout(adminRequestChannels(), 1000);
                      }} >
                      <label><input type="text" placeholder="Channel Name" defaultValue={channel.channelName} />Channel name</label>
                      <label><input type="text" placeholder="Channel Topic" defaultValue={channel.topic} />Topic</label>
                      <label><input type="checkbox" defaultChecked={channel.isVisible} />IsVisible</label>
                      <label><input type="checkbox" defaultChecked={channel.isDefault} />isDefault</label>
                      <label><input type="checkbox" defaultChecked={channel.requiresVoice} />RequiresVoice</label>
                      <label><input type="checkbox" defaultChecked={channel.requiresRegistration} />RequiresRegistration</label>
                      <label>CreatedBy: {channel.creatorNick}</label>
                      <label><input type="submit" value="Save" /></label>
                    </form>
                  );
                })}
              </div>
              /* End content section*/
            }

            {/* Begin content section CHANNEL LIST - EDIT CHANNELS*/
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
    }}>Edit</button>
    <button key={channel.channelId + "X"} onClick={()=>{
      console.log("delete channel " + channel.channelId)
    }}>Delete</button></td>
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

export default connect((state) => { return state; })(AdminModal);