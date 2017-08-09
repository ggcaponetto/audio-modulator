import { combineReducers } from 'redux';

import {
  UPDATE_WS
} from '../actions/actionTypes';

const initialState = {
  ws: null
};


function ws(state = initialState.ws, action) {
  switch (action.type) {
    case UPDATE_WS:
      return action.payload;
    default:
      return state;
  }
}

const audioModulatorApp = combineReducers({
  ws
});

export default audioModulatorApp;
