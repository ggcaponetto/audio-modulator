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
import PropTypes from 'prop-types';
import { TabNavigator } from 'react-navigation';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import logger from 'redux-logger';
import Sensors from './Sensors';
import config from '../config/config';
import Settings from './Settings';
import Main from './Main';

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

function getTabNavigator() {
  const Tabs = TabNavigator(
    {
      Settings: {
        screen: Settings,
      },
      Main: {
        screen: Main,
      },
    },
    {
      tabBarOptions: {
        style: {
          backgroundColor: 'black'
        }
      },
      swipeEnabled: false,
      tabBarPosition: 'top'
    }
  );
  return Tabs;
}

export default class EntryPoint extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {

  }

  render() {
    const Tabs = getTabNavigator();
    return (
      <Tabs screenProps={{ ws: this.props.ws, updateWS: this.props.updateWS }} />
    );
  }
}

EntryPoint.propTypes = {
  ws: PropTypes.any.isRequired,
  updateWS: PropTypes.func.isRequired
};
