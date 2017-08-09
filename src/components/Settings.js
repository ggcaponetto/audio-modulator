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
import Sensors from './Sensors';
import config from '../config/config';

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

export default class Settings extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      isMounted: false,
      ws: null,
      target: null
    };
  }

  componentDidMount() {
    // const host = 'wss://murmuring-dusk-99045.herokuapp.com';
    const host = config.WS_HOST;
    // eslint-disable-next-line no-undef
    const ws = new WebSocket(host);
    ws.onopen = () => {
      // connection opened
      console.log(`Connection opened to ${host}`);
    };

    ws.onmessage = (e) => {
      // a message was received
      console.log(e.data);
      const data = JSON.parse(e.data);
      if (data.type === 'error') {
        Alert.alert(
          'MIDI Pairing',
          'Pairing number has already been used, please refresh your browser.',
          [
            { text: 'Got it', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
      }
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

    console.log('Updating ws in redux.');
    this.props.screenProps.updateWS(ws);
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
            // eslint-disable-next-line
            // console.log('Sensor data updated (accelerometer): ', JSON.stringify(data.accelerometer));
            // console.log('Sensor data updated (gyroscope): ', JSON.stringify(data.gyroscope));
            // console.log('Sensor data updated (light): ', JSON.stringify(data.light));
          }}
        /> */}
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.setState({ target: text })}
          value={this.state.target}
        />
        <TouchableOpacity
          onPress={() => {
            if (this.state.isMounted && this.state.ws) {
              console.log('Websocket is pairing midi device');
              const message = {
                type: 'pairing',
                ts: {
                  clientTS: Date.now()
                },
                payload: {
                  targetId: parseInt(this.state.target, 10),
                  obj: { }
                }
              };
              console.log('Sending: ', message);
              this.state.ws.send(JSON.stringify(message), () => {});
            } else {
              console.log('Websocket is not ready to send midi message.');
            }
          }}
        >
          <Text style={{ fontSize: 24 }}>Pair device</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (this.state.isMounted && this.state.ws) {
              console.log('Websocket testing midi message (single)');
              const message = {
                type: 'audiomodulator',
                ts: {
                  clientTS: Date.now()
                },
                payload: {
                  targetId: parseInt(this.state.target, 10),
                  obj: [0x90, 0x35, 0x7f]
                }
              };
              console.log('Sending: ', message);
              this.state.ws.send(JSON.stringify(message), () => {});
            } else {
              console.log('Websocket is not ready to send midi message.');
            }
          }}
        >
          <Text style={{ fontSize: 24 }}>Send to paired target</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Settings.propTypes = {
  screenProps: PropTypes.object.isRequired
};
