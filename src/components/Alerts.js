import React from 'react';
import { connect } from 'react-redux';

const Alerts = (state) => {
    return (
        <div className={state.configuration.lightTheme ? "adminAlertContainer verticalFlip emphasised-container-light" : "adminAlertContainer verticalFlip emphasised-container"}>
            <p>BlazeChat</p>
            <p>Welcome!</p>
            <p>Hello :)</p>
            <p>BlazeChat</p>
            <p>Sup?</p>
        </div>
    );
}

export default connect((state) => { return state; })(Alerts);
