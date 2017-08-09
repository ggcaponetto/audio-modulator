/*
 * action creators
 */

import {
  UPDATE_WS
} from './actionTypes';

export function updateWS(ws) {
  return {
    type: UPDATE_WS,
    payload: ws
  };
}
