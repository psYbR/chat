// default object
//
// inboundMessages: [{
//     id: 0,
//     source: '*',
//     timestamp: '',
//     message: '',
//     appliedFont: '',
//     appliedColor: -1
// }],

import { createStore, combineReducers } from 'redux';

const reducerDefaultState = [];

export default (state = reducerDefaultState, action) => {
    switch (action.type) {
        case 'MESSAGE_INBOUND':
            return [ ...state,
                action.inboundMessage
                // id: action.id,
                // source: action.source,
                // timestamp: action.timestamp,
                // message: action.message,
                // appliedFont: action.appliedFont,
                // appliedColor: action.appliedColor
            ];
        default:
            return state;
    }
};