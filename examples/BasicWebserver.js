const Webserver = require('../webserver');

// Initialize webserver with options
const web = new Webserver({
  app: 'BasicWebserver',
  port: 8080
});

const router = web.getRouter('myroute');

router.get('/myobject', (req, resp) => {
  resp.json({success: true})
});

web.start();

// GET localhost:8080/myroute/myobject
