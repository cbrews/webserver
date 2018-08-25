/**
 * @param {String}      config.app Defaults "webserver"
 * @param {Number}      config.port Defaults 80
 * @param {Boolean}     config.sockets Defaults false
 * @param {Object|null} config.cors Defaults null
 * @param {String|null} config.templateEngine Defaults null
 */
module.exports = function Config(inputConfig) {
  let config;

  return {
    get
  };

  /**
   * @function getConfig()
   * @return {Object}
   */
  function get() {
    if (!config) {
      config = Object.assign({}, defaultConfig(), inputConfig);
    }
    return config;
  }

  /**
   * @function getDefaultConfig()
   * Gets default webserver configurations
   * @return {Object}
   */
  function defaultConfig() {
    return {
      app: 'webserver',
      port: 80,
      sockets: false,
      cors: null,
      templateEngine: null
    };
  }
};
