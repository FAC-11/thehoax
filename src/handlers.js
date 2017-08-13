const fs = require('fs');
const path = require('path');
const http = require("http");
const querystring = require('querystring');
const {
  loginQuery,
  verifyUser,
  makeJwt
} = require('./login');
const waterfall = require('./waterfall');
const getData = require('./queries/get_data');
const postData = require('./queries/post_data')
const env = require('env2')('./config.env');
const jwt = require('jsonwebtoken');
const searchUrl =  require('./search');

const handlers = {
  handleLanding: (req, res) => {
    const cookie = querystring.parse(req.headers.cookie);
    jwt.verify(cookie.jwt, process.env.SECRET, (err, success) => {
      if (err) {
        console.log("This is an error :", err);
        res.writeHead(302, {
          Location: '/welcome'
        })
        res.end();
      } else {
        res.writeHead(302, {
          Location: '/public/tinfoild.html'
        })
        res.end();
      }
    })
  },
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
      waterfall(dataObj, [loginQuery, verifyUser, makeJwt], (error, finalObj) => {
        if (finalObj.loggedIn) {
          res.setHeader('Set-Cookie', `jwt=${finalObj.jwebtoken}&obj=${finalObj.username}`);
          res.writeHead(302, {
            'Location': '/public/tinfoild.html',
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
  handleSearch: (req, res, url) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      body = body.split('&')[0];
      let userInput = querystring.parse(body);
      userInput.searchdate = new Date();
      postData(userInput, (err, dbResp) => {
        if (err) {
          console.log('errorinposting', err);
        } else {
          console.log('adiossss');
          console.log(dbResp);
        }
      });
    });
  },
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
handleConspiracy: (req, res, url) =>{
  
}
};




module.exports = handlers;
