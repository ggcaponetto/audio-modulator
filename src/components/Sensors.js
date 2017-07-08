import React, { Component } from 'react';
import {
  View,
  WebView,
  DeviceEventEmitter,
  NativeModules,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';

const SensorManager = NativeModules.SensorManager;

export default class Sensors extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      accelerometer: null,
      gyroscope: null,
      light: null,
      orientation: null
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    DeviceEventEmitter.addListener('Accelerometer', (data) => {
      this.setState({
        accelerometer: data
      }, this.props.onUpdate(this.state));
    });

    DeviceEventEmitter.addListener('Gyroscope', (data) => {
      this.setState({
        gyroscope: data
      }, this.props.onUpdate(this.state));
    });

    DeviceEventEmitter.addListener('LightSensor', (data) => {
      this.setState({
        light: data
      }, this.props.onUpdate(this.state));
    });

    DeviceEventEmitter.addListener('Orientation', (data) => {
      this.setState({
        orientation: data
      }, this.props.onUpdate(this.state));
    });

    try {
      SensorManager.startAccelerometer(this.props.updateDelta);
      SensorManager.startGyroscope(this.props.updateDelta);
      SensorManager.startLightSensor(this.props.updateDelta);
      SensorManager.startOrientation(this.props.updateDelta);
    } catch (e) {
      throw new Error(`Your device (${Platform.OS}) does not support the sensor implementation of this app.`);
    }
  }

  componentWillUnmount() {
    SensorManager.stopAccelerometer();
    SensorManager.stopGyroscope();
    SensorManager.stopLightSensor();
    SensorManager.stopOrientation();
  }

  render() {
    return (
      <View style={{ height: 0, width: 0 }} />
    );
  }
}

Sensors.propTypes = {
  updateDelta: PropTypes.number,
  onUpdate: PropTypes.func
};
Sensors.defaultProps = {
  updateDelta: 50,
  onUpdate: () => {}
};
