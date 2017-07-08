import React, { Component } from 'react';
import {
  View,
  WebView
} from 'react-native';
import PropTypes from 'prop-types';

function getHtml() {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pizzicato/0.6.1/Pizzicato.js"></script>
  </head>
  <body style="margin: 0px; padding: 0px">
    <div style="margin: 0px; padding: 0px">
      <script>
        var sound = new Pizzicato.Sound({
            source: 'wave',
            options: {
                type: 'sawtooth'
            }
        });
      </script>
    </div>
  </body>
  </html>`;
  return html;
}

export default class AudioSource extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  start() {
    console.log('AudioSource start.');
    this.webWiew.injectJavaScript(`
      sound.play();
      window.postMessage(JSON.stringify({code: 1, message: 'start'}));
    `);
  }

  stop() {
    console.log('AudioSource stop.');
    this.webWiew.injectJavaScript(`
      sound.pause();
      window.postMessage(JSON.stringify({code: 0, message: 'stop'}));
    `);
  }

  render() {
    return (
      <View style={{ height: 0, width: 0 }}>
        <WebView
          ref={(c) => {
            this.webWiew = c;
          }}
          onLoad={() => {
            console.log('AudioSource\'s webWiew loaded.');
            this.props.onReady();
          }}
          allowsInlineMediaPlayback
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabled
          source={{ html: getHtml() }}
          style={{ flex: 1 }}
          onMessage={(event) => {
            const data = event.nativeEvent.data;
            console.log('AudioSource\'s webWiew message.', JSON.parse(data));
          }}
        />
      </View>
    );
  }
}

AudioSource.propTypes = {
  onReady: PropTypes.func
};
AudioSource.defaultProps = {
  onReady: () => {}
};
