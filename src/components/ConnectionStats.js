import React from 'react';
import { connect } from 'react-redux';

const ConnectionStats = (state) => {
    return (
        <div className="connectionStatsContainer emphasised-container">
            <p>{state.userInterface.appIsConnected ? "[CONNECTED]" : "[DISCONNECTED]"} Ping: <span
                className={state.userInterface.currentPing < 50 ? "ping-good" : (state.userInterface.currentPing < 250 ? "ping-ok" : "ping-bad")}
            >{state.userInterface.currentPing}ms</span></p>
        </div>
    );
}

const mapStateToProps = (state) => {
    return state;
};
export default connect(mapStateToProps)(ConnectionStats);