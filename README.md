# Webserver

This application is a basic api-based initializable webserver wrapper for:
* express
* socket.io

## Usage

Initialize a webserver:
```
const web = new Webserver(options);
```

Create a router:
```
const router = web.getRouter('resource');
```

Create a route:
```
router.get('object', (req, resp) => resp.json({success: true}))
```
