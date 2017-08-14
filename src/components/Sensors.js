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
      orientation: null,
      lastUpdateTS: Date.now()
    };
    this.notifyUpdate = this.notifyUpdate.bind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {
    console.log('Sensors -> componentDidMount', { state: this.state, props: this.props });
    DeviceEventEmitter.addListener('Accelerometer', (data) => {
      this.setState({
        accelerometer: data
      }, () => {
        this.notifyUpdate(this.state);
      });
    });

    DeviceEventEmitter.addListener('Gyroscope', (data) => {
      this.setState({
        gyroscope: data
      }, () => {
        this.notifyUpdate(this.state);
      });
    });

    DeviceEventEmitter.addListener('LightSensor', (data) => {
      this.setState({
        light: data
      }, () => {
        this.notifyUpdate(this.state);
      });
    });

    DeviceEventEmitter.addListener('Orientation', (data) => {
      this.setState({
        orientation: data
      }, () => {
        this.notifyUpdate(this.state);
      });
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

  notifyUpdate(data) {
    // console.log('Sensors -> notifyUpdate -> ', {
    //   lastUpdateTS: this.state.lastUpdateTS,
    //   now: Date.now(),
    //   delta: Date.now() - this.state.lastUpdateTS }
    // );
    if (Date.now() - this.state.lastUpdateTS >= this.props.updateDelta) {
      this.props.onUpdate(data);
      this.setState({ lastUpdateTS: Date.now() });
    }
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
  updateDelta: 2000,
  onUpdate: () => {}
};
