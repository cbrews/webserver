const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const io = require('socket.io');
const path = require('path');

const Config = require('./config');

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
  */
module.exports = function Webserver(inputConfig = {}) {
  let socketClient;
  const config = (new Config(inputConfig)).get();

  const expressApp = express();
  const server = http.createServer(expressApp);

  if (config.sockets) {
    socketClient = io(server);
  }

  expressApp.use(bodyParser.json());
  expressApp.use(cors(config.cors));

  if (config.templateEngine) {
    expressApp.set('view engine', config.templateEngine);
  }

  return {
    start,
    sockets,
    getRouter,
    handle
  };

  /**
   * @function start()
   * Server start entrypoint
   * @return {Promise}
   */
  function start() {
    // Setup 404 route on start
    expressApp.use((req, resp) => resp.status(404).json({ error: 'Not Found' }));

    return server.listen(config.port, () => {
      console.log(`Webserver - Server for ${config.app} is listening on port ${config.port}`);
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
   * @function handler()
   * Basic wrapper handler for web routes
   * @param {Function} routeFn
   * @return {Promise}
   */
  function handle(routeFn) {
    return (req, resp, next) => Promise.resolve()
      .then(() => routeFn(req, resp))
      .then((result) => {
        resp.json(result);
        return next();
      })
      .catch((err) => {
        console.error(`Webserver - Error: ${err.message}`, err);

        return resp.status(500).json({
          error: err.message
        });
      });
  }
};
