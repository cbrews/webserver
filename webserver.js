const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const io = require('socket.io');
const path = require('path');

 /**
  * @class Webserver
  * Wrapper class for express and core express components including:
  *   Initialization
  *   Routing
  *   Sockets
  *   Templating
  *   body parsing
  *
  * @param {Object}      config
  * @param {String}      config.app Defaults "webserver"
  * @param {Number}      config.port Defaults 80
  * @param {Boolean}     config.sockets Defaults false
  * @param {Object|null} config.cors Defaults null
  * @param {String|null} config.templateEngine Defaults null
  */
module.exports = function Webserver(inputConfig = {}) {
  let socketClient;
  let config;

  const expressApp = express();
  const server = http.createServer(expressApp);

  if (getConfig().sockets) {
    socketClient = io(server);
  }

  expressApp.use(bodyParser.json());
  expressApp.use(cors(getConfig().cors));

  if(getConfig().templateEngine){
    expressApp.set('view engine', getConfig().templateEngine);
  }

  return {
    start,
    sockets,
    getRouter,
    getConfig
  };

  /**
   * @function start()
   * Server start entrypoint
   * @return {Promise}
   */
  function start() {
    // Setup 404 route on start
    expressApp.use((req, resp) => resp.status(404).json({ error: 'Not Found' }));

    return server.listen(getConfig().port, () => {
      console.log(`Webserver - Server for ${getConfig().app} is listening on port ${getConfig().port}`);
    });
  }

  /**
   * @function sockets()
   * Gets the sockets io entrypoint for usage
   * @return {Object}
   */
  function sockets() {
    if (socketClient) {
      return socketClient;
    }
    return false;
  }

  /**
   * @function getRouter()
   * Gets the router for web, with an optional path prefix
   * @param {String} resourceName
   * @return {Object} router
   */
  function getRouter(resourceName) {
    if (resourceName) {
      const router = express.Router();

      console.debug(`Webserver - Initializing a router with base path ${path.join('/', resourceName)}`);
      expressApp.use(path.join('/', resourceName), router);

      return router;
    }
    return expressApp;
  }

  /**
   * @function getConfig()
   * @return {Object}
   */
  function getConfig() {
    if(!config){
      config = Object.assign({}, getDefaultConfig(), inputConfig);
    }
    return config;
  }

  /**
   * @function getDefaultConfig()
   * Gets default webserver configurations
   * @return {Object}
   */
  function getDefaultConfig(){
    return {
      app: "webserver",
      port: 80,
      sockets: false,
      cors: null,
      templateEngine: null
    }
  }
};
