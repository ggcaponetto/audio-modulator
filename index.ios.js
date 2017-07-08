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
  View
} from 'react-native';
import Main from './src/components/Main';

export default class AudioModulator extends Component {
  render() {
    return (
      <Main></Main>
    );
  }
}
AppRegistry.registerComponent('AudioModulator', () => AudioModulator);