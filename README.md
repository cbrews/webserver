# Webserver

This application is a basic api-based initializable webserver wrapper for:
* express
* socket.io

## Usage

Initialize a webserver:
```
const options = {
  port: 4001
}
const web = new Webserver(options);
```

Create a router:
```
const router = web.getRouter('myroute');
```

Create a route (with json handling):
```
router.get('mypath', web.handle(req => ({success: true})));
```

Start the server:
```
web.start();
```

```
curl localhost:4001/myroute/mypath

// {
//   "success": "true"
// }
```
