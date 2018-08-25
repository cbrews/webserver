// Unit under test
const Config = require('../lib/config');

test('create empty config', () => {
  const config = new Config();
  expect(config.get()).toEqual({
    app: 'webserver',
    port: 80,
    sockets: false,
    cors: null,
    templateEngine: null
  });
});

test('create basic config', () => {
  const config = new Config({
    app: 'myapp',
    port: 8080
  });
  expect(config.get()).toEqual({
    app: 'myapp',
    port: 8080,
    sockets: false,
    cors: null,
    templateEngine: null
  });
});
