// Unit under test
const Webserver = require('../webserver');

test('create empty config', () => {
  const web = new Webserver();
  expect(web.getConfig()).toEqual({
    app: 'webserver',
    port: 80,
    sockets: false,
    cors: null,
    templateEngine: null
  });
});

test('create basic config', () => {
  const web = new Webserver({
    app: 'myapp',
    port: 8080
  });
  expect(web.getConfig()).toEqual({
    app: 'myapp',
    port: 8080,
    sockers: false,
    cors: null,
    templateEngine: null
  });
});
