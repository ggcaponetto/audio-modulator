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

export default class Main extends Component {

  constructor(props, context){
    super(props, context);
    this.state = {
      isAudioReady: false
    };
  }

  componentDidMount(){

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
            if(!this.state.isAudioReady){
              this.setState({
                isAudioReady: true
              }, () => { console.log('AudioSource is ready.') })
            }
          }}
        />
        <TouchableOpacity onPress={() => {
          this.audio.start()
        }}>
          <Text>start</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          this.audio.stop()
        }}>
          <Text>stop</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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
