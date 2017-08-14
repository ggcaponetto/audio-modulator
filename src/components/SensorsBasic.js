import React, { Component } from 'react';
import {
  View,
  WebView,
  DeviceEventEmitter,
  NativeModules,
  Platform
} from 'react-native';
import PropTypes from 'prop-types';

import { Accelerometer, Gyroscope } from 'react-native-sensors';


export default class SensorsBasic extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      accelerationObservable: null,
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
    const self = this;
    const updateDelta = this.props.updateDelta;
    const accelerationObservable = new Accelerometer({
      updateInterval: updateDelta // defaults to 100ms
    });
    this.state.accelerationObservable = accelerationObservable;
    // Normal RxJS functions
    this.state.accelerationObservable
      .map(({ x, y, z }) => x + y + z)
      .subscribe(speed => () => {
        console.log(`You moved your phone with ${speed}`);
        self.notifyUpdate(speed);
      });
  }

  componentWillUnmount() {
    this.state.accelerationObservable.stop();
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

SensorsBasic.propTypes = {
  updateDelta: PropTypes.number,
  onUpdate: PropTypes.func
};
SensorsBasic.defaultProps = {
  updateDelta: 2000,
  onUpdate: () => {}
};
