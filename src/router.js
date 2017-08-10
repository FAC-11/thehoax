const handlers = require('./handlers');

const router = (req, res) => {
  const url = req.url;
  const publicFile = req.url.split('/')[2];

  switch (`${req.method} ${req.url}`) {
    case 'GET /':
      handlers.handleHomeRoute(req, res);
      break;
    case `GET /public/${publicFile}`:
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
      case 'GET /tinfoild':
        handlers.handleTinfoild(req, res, url);
        break;
    default:
      res.writeHead(404, 'Content-Type: text/html');
      res.end('<h1>404!</h1><h2>We were never here...</h2>');
      break;
  }
};

module.exports = router;
