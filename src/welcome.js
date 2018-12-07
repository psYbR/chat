import React from 'react';
import { enableSocket } from './utils/handlers/client';

class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render = () => (
    <div className={'modal-outer-container splash-modal-outer' + (this.props.fadingOut ? ' modal-fade-out' : '')}>
      <div className='modal-inner-container splash-modal-inner'>
        <h1>Welcome to <a>blazechat</a></h1>
        <h3>a free chatroom</h3>
        <p>blazechat is a free-to-use chat room offering a range of rooms for various topics, as well as the ability for users to 
          create and register their own permanent chat rooms and host private chats with friends. The main chat rooms are moderated 
          and rules apply, however user-created rooms are moderated by the room creators however they see fit, in accordance with 
          the terms of use.
        </p>
        <button className="button-default" onClick={()=>{
          this.props.fadeOut()
          enableSocket()
        }}>PROCEED</button>
      </div>
    </div>
  )
}

export default Welcome;