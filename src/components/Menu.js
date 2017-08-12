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
import { TabNavigator, StackNavigator } from 'react-navigation';
import PropTypes from 'prop-types';
import config from '../config/config';


export default class Menu extends Component {
  static navigationOptions = {
    title: 'Menu',
  }

  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  componentDidMount() {
    console.log('Menu -> componentDidMount:', { state: this.state, props: this.props });
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            console.log('Menu -> onPress:', { state: this.state, props: this.props });
            this.props.navigation.navigate('Gravity');
          }}
        >
          <Text>Gravity</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

Menu.propTypes = {
  // screenProps: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired
};
