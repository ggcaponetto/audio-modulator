/* eslint-env browser */

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
import SensorsBasic from '../SensorsBasic';
import config from '../../config/config';

export default class Gravity extends Component {
  static navigationOptions = {
    title: 'Gravity',
  }

  constructor(props, context) {
    super(props, context);
    this.state = {

    };
  }

  componentDidMount() {
    console.log('Gravity -> componentDidMount:', { state: this.state, props: this.props });
  }
  render() {
    return (
      <View style={{}}>
        <Text>Gravity module</Text>
        <SensorsBasic
          updateDelta={2000}
          onUpdate={(data) => {
            // console.log('Sensor data updated: ', data);
            // console.log('Sensor data updated (orientation): ', JSON.stringify(data.orientation));
            // eslint-disable-next-line
            console.log('Sensor data updated (accelerometer): ', JSON.stringify(data.accelerometer));
            // console.log('Sensor data updated (gyroscope): ', JSON.stringify(data.gyroscope));
            // console.log('Sensor data updated (light): ', JSON.stringify(data.light));
          }}
        />
      </View>
    );
  }
}

Gravity.propTypes = {
  // screenProps: PropTypes.object.isRequired
};
