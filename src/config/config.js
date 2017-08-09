/* eslint global-require: "warn" */
import _ from 'lodash';
import configuration from './configuration';

function overwriteConfig() {
  try {
    const configurationLocal = require('./local-configuration').default;
    console.log('Configuration override! (\'proj-root/src/config/local-configuration.js\' found.)', { configuration, configurationLocal });
    const mergedConfig = _.merge({}, configuration, configurationLocal);
    console.log('Merged config', mergedConfig);
    return mergedConfig;
  } catch (e) {
    console.log('No configuration override, using default config. (No \'proj-root/src/config/local-configuration.js\' found.)', configuration);
    return configuration;
  }
}

// FOR RELEASE BUILDS USE:
// const config = overwriteConfig(configuration).production;
const config = overwriteConfig().development;

export default config;
