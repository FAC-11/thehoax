const http = require('http');
const router = require('./router');

const port = process.env.PORT || 4000;
const hostname = process.env.HOSTNAME || '0.0.0.0';

const server = http.createServer(router);

server.listen(port, hostname, () => {
  console.log(`Server is running at port http://${hostname}:${port}`)
});
