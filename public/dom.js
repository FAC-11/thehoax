function httpRequest (url, reqType, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    } else {
      cb(xhr.status, xhr.responseType);
    }
  }
  xhr.open(reqType, url, true);
  xhr.send();
}

httpRequest('/tinfoild', 'GET', function(err, data) {

});

var getGreeting = function() {
  var cookie = document.cookie;
  var username = cookie.split('&')[1].split('=')[1];
  var greeting = document.getElementById('user-welcome');
  greeting.textContent = username;
};

getGreeting();
// httpRequest(url, 'get', '/getData' cb)
