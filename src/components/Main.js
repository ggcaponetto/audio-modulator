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
    this.state = {
      isMounted: false,
      ws: null
    };
  }

  componentDidMount() {
    const host = 'wss://murmuring-dusk-99045.herokuapp.com';
    // eslint-disable-next-line no-undef
    const ws = new WebSocket(host);
    ws.onopen = () => {
      // connection opened
      console.log(`Connection opened to ${host}`);
    };

    ws.onmessage = (e) => {
      // a message was received
      console.log(e.data);
    };

    ws.onerror = (e) => {
      // an error occurred
      console.log(e.message);
    };

    ws.onclose = (e) => {
      // connection closed
      console.log(e.code, e.reason);
    };
    this.state.isMounted = true;
    this.state.ws = ws;
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to Audio Modulator!
        </Text>
        {/* <Sensors
          onUpdate={(data) => {
            // console.log('Sensor data updated: ', data);
            // console.log('Sensor data updated (orientation): ', JSON.stringify(data.orientation));
            // eslint-disable-next-line max-len
            // console.log('Sensor data updated (accelerometer): ', JSON.stringify(data.accelerometer));
            // console.log('Sensor data updated (gyroscope): ', JSON.stringify(data.gyroscope));
            // console.log('Sensor data updated (light): ', JSON.stringify(data.light));
          }}
        /> */}
        <TouchableOpacity
          onPress={() => {
            if (this.state.isMounted && this.state.ws) {
              console.log('Websocket testing midi message');
              const message = { type: 'audiomodulator', payload: {} };
              this.state.ws.send(JSON.stringify(message), () => {});
            } else {
              console.log('Websocket is not ready to send midi message.');
            }
          }}
        >
          <Text style={{ fontSize: 24 }}>Send test</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('Button test');
          }}
        >
          <Text style={{ fontSize: 24 }}>Button test</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
