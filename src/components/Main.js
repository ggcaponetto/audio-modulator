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
  TouchableOpacity
} from 'react-native';
import AudioSource from './AudioSource';
import Sensors from './Sensors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {

  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Audio Modulator!
        </Text>
        <AudioSource
          ref={(audio) => {
            this.audio = audio;
          }}
          onReady={() => {
            console.log('AudioSource is ready.');
          }}
        />
        <Sensors
          onUpdate={(data) => {
            // console.log('Sensor data updated: ', data);
            // console.log('Sensor data updated (orientation): ', JSON.stringify(data.orientation));
            // console.log('Sensor data updated (accelerometer): ', JSON.stringify(data.accelerometer));
            // console.log('Sensor data updated (gyroscope): ', JSON.stringify(data.gyroscope));
            // console.log('Sensor data updated (light): ', JSON.stringify(data.light));
          }}
        />
        <TouchableOpacity onPress={() => {
          this.audio.start();
        }}
        >
          <Text>start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.audio.stop();
        }}
        >
          <Text style={{ marginTop: 100 }}>stop</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
