/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { TabNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import Sensors from './Sensors';
import config from '../config/config';
import Settings from './Settings';
import EntryPointContainer from '../containers/EntryPointContainer';

import audioModulatorApp from '../reducers/reducers';

function getReduxStore() {
  let store = null;
  if (config.isLoggingEnbaled) {
    store = createStore(
      audioModulatorApp,
      applyMiddleware(thunk, logger)
    );
  } else {
    store = createStore(audioModulatorApp);
  }
  return store;
}
const store = getReduxStore();

export default class AudioModulatorApp extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    return (
      <Provider store={store}>
        <EntryPointContainer />
      </Provider>
    );
  }
}
