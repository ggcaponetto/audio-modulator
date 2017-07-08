import React, { Component } from 'react';
import {
  View,
  WebView
} from 'react-native';

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
    this.webWiew.injectJavaScript(`
      sound.play();
    `);
  }

  stop() {
    this.webWiew.injectJavaScript(`
      sound.pause();
    `);
  }

  render() {
    return (
      <View style={{ height: 0, width: 0 }} accessible={false}>
        <WebView
          ref={(c) => {
            this.webWiew = c;
          }}
          allowsInlineMediaPlayback
          javaScriptEnabled
          source={{ html: getHtml() }}
          style={{ flex: 1 }}
          onMessage={(event) => {

          }}
        />
      </View>
    );
  }
}
