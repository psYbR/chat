import React from 'react';
import { connect } from 'react-redux';
import { hideChannelModal, channelPickerFirstTab, channelPickerSecondTab, startRetrieveUserChannels, stopRetrieveUserChannels, setNumberOfUserChannels } from '../actions/userInterfaceActions';
import DefaultChannelPicker from './DefaultChannelPicker';
import UserChannelPicker from './UserChannelPicker';
import { addUserChannel } from '../actions/userChannelsActions';
import { requestToJoinDefaultChannels } from '../utils/handlers/joinDefaultChannels';
//import { requestToJoinUserChannels } from '../utils/handlers/joinUserChannels';

// to do:
//  the below.

const userChannels = [
  { channelId: 50, channelName: 'abc', topic: 'alphabet' },
  { channelId: 51, channelName: 'sadfs', topic: 'Chanel Topic Goes Here' },
  { channelId: 52, channelName: 'asdfasdfas', topic: 'Chanel Topic Goes Here' },
  { channelId: 53, channelName: 'asdasdf', topic: 'Chanel Topic Goes Here' },
  { channelId: 54, channelName: '3243ef3ef', topic: 'Chanel Topic Goes Here' },
  { channelId: 55, channelName: '34f54h65h', topic: 'Chanel Topic Goes Here' },
  { channelId: 56, channelName: 'edfgdfnj567uj', topic: 'Chanel Topic Goes Here' },
  { channelId: 57, channelName: '23f23e2', topic: 'Chanel Topic Goes Here' },
  { channelId: 58, channelName: '34g45y5', topic: 'Chanel Topic Goes Here' },
  { channelId: 59, channelName: '78k869khj', topic: 'Chanel Topic Goes Here' },
  { channelId: 60, channelName: 'mr6ughj7', topic: 'Chanel Topic Goes Here' },
  { channelId: 61, channelName: 'hgmhgfnf', topic: 'Chanel Topic Goes Here' },
  { channelId: 62, channelName: '765ui678', topic: 'Chanel Topic Goes Here' },
  { channelId: 63, channelName: 'xsdxcv', topic: 'Chanel Topic Goes Here' },
  { channelId: 64, channelName: 'dfbgbfvbcgb', topic: 'Chanel Topic Goes Here' },
  { channelId: 65, channelName: 'jskjskwsiwiw', topic: 'Chanel Topic Goes Here' },
  { channelId: 66, channelName: 'w2i82382wuwsujs', topic: 'Chanel Topic Goes Here' },
  { channelId: 67, channelName: '28wusuw', topic: 'Chanel Topic Goes Here' },
  { channelId: 68, channelName: '282w383', topic: 'Chanel Topic Goes Here' },
  { channelId: 69, channelName: '37267yq2yq', topic: 'Chanel Topic Goes Here' },
  { channelId: 70, channelName: 'u32u83838', topic: 'Chanel Topic Goes Here' },
  { channelId: 71, channelName: '27yqyy', topic: 'Chanel Topic Goes Here' },
  { channelId: 72, channelName: 'u23u3u83838', topic: 'Chanel Topic Goes Here' }
]

class Modal extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="modal-wrapper">
        {/* <div className="modal-blur-container">
        </div> */}
        <div className="modal-outer-container">
          <div className="modal-inner-container channelPickerContainer">

            <div className="tab-container">
              <div className={"defaultTab tab" + (!this.props.userInterface.channelPickerSecondTab ? " tab-selected" : "")}
                onClick={(e) => {
                  //this.props.dispatch(channelPickerFirstTab());
                }}
              >
                <h1 className="channelPickerTabTitle">Default Channels</h1>
              </div>
              <div className={"userTab tab tab-disabled" + (this.props.userInterface.channelPickerSecondTab ? " tab-selected" : "")}
                onClick={(e) => {
                  return;
                  this.props.dispatch(channelPickerSecondTab());
                  if (this.props.userChannels.length < 1) { //only retrieve channels once
                    this.props.dispatch(setNumberOfUserChannels(23));
                    this.props.dispatch(startRetrieveUserChannels());
                    let delay = 0;
                    userChannels.map((channel) => {
                      setTimeout(()=>{
                        this.props.dispatch(addUserChannel(channel));
                      }, delay);
                      delay += 100;
                    });
                    setTimeout(()=>{
                      this.props.dispatch(stopRetrieveUserChannels());
                    }, delay);
                  }
                }}
              >
                <h1 className="channelPickerTabTitle">User Channels</h1>
              </div>
            </div>
            
            {!this.props.userInterface.channelPickerSecondTab &&
              <div className="ContainerChannelPicker">
                <DefaultChannelPicker />
              </div>}

            {this.props.userInterface.channelPickerSecondTab &&
              <div className="ContainerChannelPicker">
                <UserChannelPicker />
              </div>}

            <button
              className='channelPickerButton'
              onClick={(e) => {
                //actions depends on which tab is active
                if (this.props.userInterface.channelPickerSecondTab) {
                  //requestToJoinUserChannels(this.props.state, this.props.dispatch);
                  this.props.dispatch(hideChannelModal());
                } else {
                  requestToJoinDefaultChannels(this.props, this.props.dispatch);
                  this.props.dispatch(hideChannelModal());
                }
              }}
            >OK</button>
            
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Modal);