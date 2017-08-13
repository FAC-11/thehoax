// search.js will call the hoaxy api
// filter articles
// send back top 3 articles

const env = require('env2')('config.env');

const makeHoaxyUrl = () => {
  const urlStart = 'https://api-hoaxy.p.mashape.com/articles';
  const urlEnd = 'not yet defined'
  let finalUrl = urlStart + logicObj.resultsObj.line + process.env.apiKey + urlEnd;
  sendRequest(finalUrl);
};

const sendRequest = (url) => {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var data = JSON.parse(xhr.responseText);
      }
    };
    xhr.open("GET", url, true);
    xhr.send();
  },


  module.exports = makeHoaxyUrl;
