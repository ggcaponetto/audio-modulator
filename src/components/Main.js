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
import { TabNavigator, StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import Sensors from './Sensors';
import Menu from './Menu';

import Gravity from './modules/Gravity';
import BGrid from './modules/BGrid';
import config from '../config/config';

const ModalStack = StackNavigator({
  Menu: {
    screen: Menu
  },
  Gravity: {
    screen: Gravity
  },
  BGrid: {
    screen: BGrid
  }
});

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    console.log('Main -> componentDidMount:', { state: this.state, props: this.props });
  }

  render() {
    return (
      <ModalStack screenProps={{
        EntryPoint: {
          screenProps: this.props.screenProps
        }
      }}
      />
    );
  }
}

Main.propTypes = {
  screenProps: PropTypes.object.isRequired
};
