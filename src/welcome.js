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
        <h3>Placeholder</h3>
        <p>Some text about the app here</p>
        <button className="button-default" onClick={()=>{
          this.props.fadeOut()
          enableSocket()
        }}>PROCEED</button>
      </div>
    </div>
  )
}

export default Welcome;