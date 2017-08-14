const configurationLocal = {
  development: {
    WS_HOST: 'ws://192.168.1.5:5000',
    // WS_HOST: 'ws://192.168.200.57:5000',
    isLoggingEnbaled: true
  },
  production: {
    WS_HOST: 'https://murmuring-dusk-99045.herokuapp.com/',
    isLoggingEnbaled: true
  }
};

export default configurationLocal;
