// '/'-> home route
// '/login' -> from homepage
// '/logout' -> on click
// '/search' -> to call hoaxy api
// '/tinfoild' -> landing page after login
// '/default' -> for error handling
//

const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const {
  loginQuery,
  verifyUser
} = require('./login');
const waterfall = require('./waterfall');
const getData = require('./queries/get_data');
const postData = require('./queries/postData');

const handlers = {
  handleHomeRoute: (req, res) => {
    const filePath = path.join(__dirname, '..', 'public', 'index.html');
    fs.readFile(filePath, (error, file) => {
      if (error) {
        res.writeHead(500, 'Content-Type:text/html');
        res.end('<h1>Sorry, government fatcats have stolen our server</h1><h2>Run for the hills!</h2>');
      } else {
        res.writeHead(200, 'Content-Type:text/html');
        res.end(file);
      }
    });
  },
  handlePublic: (req, res, url) => {
    const extension = url.split('.')[1];
    const extensionType = {
      html: 'text/html',
      css: 'text/css',
      js: 'application/javascript',
      ico: 'image/x-icon',
    };
    const filePath = path.join(__dirname, '..', url);
    fs.readFile(filePath, (error, file) => {
      if (error) {
        res.writeHead(500, 'Content-Type:text/html');
        res.end('<h1>Sorry, government fatcats have stolen our server</h1><h2>Run for the hills!</h2>');
      } else {
        res.writeHead(200, `Content-Type: ${extensionType[extension]}`);
        res.end(file);
      }
    });
  },
  handleLogin: (req, res, url) => {
    let data = '';

    req.on('data', (chunk) => {
      data += chunk;
    })

    req.on('end', () => {
      let dataObj = querystring.parse(data);
      waterfall(dataObj, [loginQuery, verifyUser], (error, finalObj) => {
        if (finalObj.loggedIn) {
          res.writeHead(302, {
            'Location': '/public/tinfoild.html'
          });
          res.end();
        } else {
          res.writeHead(302, {
            'Location': '/'
          });
          res.end();
        }
      });
    });
  },
  handleLogout: (req, res, url) => {},
  handleTinfoild: (req, res, url) => {
    getData((err, dbResp) => {
      if (err) return console.log('error from db query', err);
      let data = JSON.stringify(dbResp);
      res.writeHead(200, {
        "content-type": "application/json"
      });
      res.end(data);
    });
  },
  handleSearch: (req, res, url) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      let input = querystring.parse(data);
      console.log(input);
      postData(input, (err, res) => {
        if (err) {
          console.log(err)
        } else {
          console.log(res);
        }
      })
    })
  }
};

module.exports = handlers;
