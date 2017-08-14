/* eslint-env browser */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Button,
  Alert
} from 'react-native';
import PropTypes from 'prop-types';
import config from '../../config/config';

export default class BGrid extends Component {
  static navigationOptions = {
    title: 'BGrid',
    header: null
  }

  constructor(props, context) {
    super(props, context);
    this.state = {
      isInSettingsMode: false,
      settings: {
        rows: 5,
        columns: 5
      }
    };
    this.getGrid = this.getGrid.bind(this);
    this.getSettings = this.getSettings.bind(this);
    this.getNavigationBar = this.getNavigationBar.bind(this);
  }

  componentDidMount() {
    console.log('BGrid -> componentDidMount:', { state: this.state, props: this.props });
  }

  getGrid(rowNr, columnNr) {
    const buildColumns = (row) => {
      const columns = [];
      for(let i = 0; i < columnNr; i = i + 1){
        columns.push(
            <View style={{ flex: 1 }} key={`r_${row}_c_${i}`}>
              <TouchableOpacity
                style={{ flex: 1 }}
                onPress = {() => {
                  console.log('BGrid -> onPress -> ', { rowNr : row, columnNr : i })
                }}
                >
                  <Text>r:{row}, c: {i}</Text>
              </TouchableOpacity>
            </View>
        );
      }
      return columns;
    }
    const rows = [];
    for(let i = 0; i < rowNr; i = i + 1){
      rows.push(
          <View style={{ flex: 1, flexDirection: 'row' }} key={`r_${i}`}>
            {buildColumns(i)}
          </View>
      );
    }
    return rows;
  }
  getSettings() {
    if(this.state.isInSettingsMode){
      return (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({
              settings: {
                rows: parseInt(text, 10),
                columns: this.state.settings.columns,
              }
            }, () => {
              console.log('BGrid -> settings -> onChangeText -> ', this.state);
            })}
            value={this.state.settings.rows}
          />
          <TextInput
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={text => this.setState({
              settings: {
                columns: parseInt(text, 10),
                rows: this.state.settings.rows,
              }
            }, () => {
              console.log('BGrid -> settings -> onChangeText -> ', this.state);
            })}
            value={this.state.settings.columns}
          />
          <TouchableOpacity
            onPress={() => {
              this.setState({
                isInSettingsMode: false
              });
            }}
          >
            <Text style={{ textAlign: 'center' }}>Close</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return null;
    }
  }

  getNavigationBar() {
    const bar = (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
        >
          <View style={{}}>
            <Text style={{ textAlign: 'center' }}>Back</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            this.setState({
              isInSettingsMode: !this.state.isInSettingsMode
            });
          }}
        >
          <View style={{}}>
            <Text style={{ textAlign: 'center' }}>Settings</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
    return bar;
  }

  render() {
    return (
      <View style={{ flex: 1, position: 'relative' }}>
        {this.state.isInSettingsMode ? null : this.getNavigationBar()}
        {this.getSettings()}
        {this.state.isInSettingsMode ?
          null :
          this.getGrid(
            this.state.settings.rows, this.state.settings.columns
          )}
      </View>
    );
  }
}

BGrid.propTypes = {
  // screenProps: PropTypes.object.isRequired
};
