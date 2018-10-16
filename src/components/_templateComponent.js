import React from 'react';
import ExtraComponent from './components/ExtraComponent';
import { functions } from './util/util.js'

class AnotherComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="extraComponentContainer">
        <ExtraComponent />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(AnotherComponent);