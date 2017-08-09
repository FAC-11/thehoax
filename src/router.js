const handlers = require('./handlers');

const router = (req, res) => {
  const url = req.url;

  switch (`${req.method} ${url}`) {
    case 'GET /':
      handlers.handleHomeRoute(req, res);
      break;
    case `GET ${/\/public\/.*/}`:
      handlers.handlePublic(req, res, url);
      break;
    case 'POST /login':
      handlers.handleLogin(req, res, url);
      break;
    case 'POST /logout':
      handlers.handleLogout(req, res, url);
      break;
    case 'POST /search':
      handlers.handleSearch(req, res, url);
      break;
    case 'POST /tinfoild':
      handlers.handleTinfoild(req, res, url);
      break;
    default:
      res.writeHead(404, 'Content-Type: text/html');
      res.end('<h1>404 not found</h1>');
      break;
  }
};

module.exports = router;
