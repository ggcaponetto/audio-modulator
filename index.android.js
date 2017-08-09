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
// eslint-disable-next-line
import AudioModulatorApp from './src/components/AudioModulatorApp';

export default class AudioModulator extends Component {
  render() {
    return (
      <AudioModulatorApp />
    );
  }
}
AppRegistry.registerComponent('AudioModulator', () => AudioModulator);
